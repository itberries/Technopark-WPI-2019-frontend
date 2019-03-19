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
      next: 3,
      previous: 1,
    };
  }

  componentDidMount() {
    this.setContent();
  }

  setContent() {
    let content = '';
    switch (this.state.type) {
      case 'theory':
        content = React.createElement(Theory, { id: this.state.id });
        this.setState({ content });
        break;
      case 'interactive':
        content = React.createElement(Interact, { id: this.state.id });
        this.setState({ content });
        break;
      case 'training':
        content = React.createElement(Traning, { id: this.state.id });
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
            <Button
              level="commerce"
              className={`step__button ${
                this.state.previous !== 'undefined' ? 'step__button-unactive' : ''
              }`}
            >
              Previous
            </Button>
          </Div>
          <Div>
            <Button
              level="commerce"
              className={`step__button ${
                this.state.next !== 'undefined' ? 'step__button-unactive' : ''
              }`}
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
};

export default Step;
