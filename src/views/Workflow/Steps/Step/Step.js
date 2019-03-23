import React from 'react';
import PropTypes from 'prop-types';
import { Header, Div, Button } from '@vkontakte/vkui';

import Theory from './types/__Theory/Theory';
import Interact from './types/__Interactive/Interactive';
import Traning from './types/__Training/Training';

import './Step.scss';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goBack: this.props.goBack,
      goForward: this.props.goForward,
    };
  }

  setContent() {
    let content = '';
    switch (this.props.type) {
      case 'theory':
        content = React.createElement(Theory, { id: this.props.id });
        return content;
      case 'interactive':
        content = React.createElement(Interact, { id: this.props.id });
        return content;
      case 'training':
        content = React.createElement(Traning, { id: this.props.id });
        return content;
      default:
        console.error('unregistered step type');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header className="step__header">{this.props.name}</Header>
        <Div className="step__content">{this.setContent()}</Div>
        <Div className="step__buttons">
          <Div>
            <Button
              level="commerce"
              className={`step__button ${
                this.props.previous === 'undefined' ? 'step__button-unactive' : ''
              }`}
              onClick={() => {
                this.state.goBack();
                this.setContent();
              }}
            >
              Previous
            </Button>
          </Div>
          <Div>
            <Button
              level="commerce"
              className={`step__button ${
                this.props.next === 'undefined' ? 'step__button-unactive' : ''
              }`}
              onClick={() => {
                this.state.goForward();
                this.setContent();
              }}
            >
              Next
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
  /* Description of prop "goBack". */
  goBack: PropTypes.func.isRequired,
  /* Description of prop "goForward". */
  goForward: PropTypes.func.isRequired,
  /* Description of prop "goForward". */
  next: PropTypes.number.isRequired,
  /* Description of prop "previous". */
  previous: PropTypes.number.isRequired,
};

export default Step;
