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
      id: props.id,
      name: props.name,
      type: props.type,
      content: '',
    };
  }

  componentDidMount() {
    this.setContent();
  }

  setContent() {
    let content = '';
    switch (this.state.type) {
      case 'theory':
        content = React.createElement(Theory, { name: this.state.name, id: this.state.id });
        this.setState({ content });
        break;
      case 'interactive':
        content = React.createElement(Interact, { name: this.state.name });
        this.setState({ content });
        break;
      case 'training':
        content = React.createElement(Traning, { name: this.state.name });
        this.setState({ content });
        break;
      default:
        console.error('unregistered step type');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header className="step__header">{this.state.name}</Header>
        <Div className="step__content">{this.state.content}</Div>
        <Div className="step__buttons">
          <Div>
            <Button level="commerce" className="step__button step__button-unactive">
              Previous
            </Button>
          </Div>
          <Div>
            <Button level="commerce" className="step__button">
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
};

export default Step;
