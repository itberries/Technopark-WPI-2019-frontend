import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Div, Button } from '@vkontakte/vkui';

import Theory from './types/__Theory/Theory';
import Interact from './types/__Interactive/Interactive';

import { updateUserProfile } from '../../../../actions/user';

import './Step.scss';

const mapStateToProps = (state) => {
  const { user } = state.user;
  if (
    typeof user !== 'undefined'
    && typeof state.vk.vkAppUser.vkUserInfo !== 'undefined'
    && state.vk.vkAppUser.vkUserInfo !== null
  ) {
    user.firstName = state.vk.vkAppUser.vkUserInfo.first_name;
    user.lastName = state.vk.vkAppUser.vkUserInfo.last_name;
    user.photo = state.vk.vkAppUser.vkUserInfo.photo_200;
  }
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateUserProfile,
  },
  dispatch,
);

class Step extends React.Component {
  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  setContent() {
    console.log('steps setContent');
    let content = '';
    switch (this.props.type) {
      case 'theory':
        content = React.createElement(Theory, { id: this.props.id, key: this.props.id });
        return content;
      case 'interactive':
      case 'training':
        content = React.createElement(Interact, {
          id: this.props.id,
          key: this.props.id,
          onCompleted: () => {
            setTimeout(() => {
              console.log('onCompleted');
              console.log('this.props.user: ', this.props.user);
              this.props.updateUserProfile(this.props.user.id);
              this.props.goForward();
              this.setContent();
            }, 500);
          },
          type: this.props.type,
        });
        return content;
      default:
        console.error('unregistered step type');
        return '';
    }
  }

  render() {
    const cont = this.setContent();
    return (
      <React.Fragment>
        <Header className="step__header">{this.props.name}</Header>
        <Div>{cont}</Div>
        <Div className="step__buttons">
          <Div>
            <Button
              level="commerce"
              className={`step__button ${this.props.previous === 0 ? 'step__button-unactive' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.props.goBack();
                this.setContent();
              }}
            >
              Предыдущий
            </Button>
          </Div>
          <Div>
            <Button
              level="commerce"
              className={`step__button ${
                this.props.type === 'interactive' && this.props.isLast
                  ? 'step__button-unactive'
                  : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.props.type !== 'interactive' || !this.props.isLast) {
                  this.props.goForward();
                  this.setContent();
                }
              }}
            >
              {this.props.next !== 0 ? 'Следующий' : 'Завершить'}
            </Button>
          </Div>
        </Div>
      </React.Fragment>
    );
  }
}

Step.propTypes = {
  /* Description of prop "id". */
  id: PropTypes.number.isRequired,
  /* Description of prop "name". */
  name: PropTypes.string.isRequired,
  /* Description of prop "type". */
  type: PropTypes.string.isRequired,
  /* Description of prop "type". */
  isLast: PropTypes.bool.isRequired,
  /* Description of prop "goBack". */
  goBack: PropTypes.func.isRequired,
  /* Description of prop "goForward". */
  goForward: PropTypes.func.isRequired,
  /* Description of prop "previous". */
  previous: PropTypes.number.isRequired,
  /* Description of prop "previous". */
  next: PropTypes.number.isRequired,
  /* Description of prop "getUserProfile". */
  updateUserProfile: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step);
