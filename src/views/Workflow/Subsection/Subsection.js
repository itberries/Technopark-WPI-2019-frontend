import React from 'react';

import axios from 'axios';

import { Div } from '@vkontakte/vkui';

import SubsectionBlock from './__Block/Subsection__Block';
import './Subsection.scss';

/**
 * Subsection component for learning workflow
 */
class Subsection extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * @type {object}
     * @property {array[object]} steps Array of subsection's steps
     */
    this.state = {
      id: null,
      steps: [],
    };
  }

  componentDidMount() {
    this.getSteps();
  }

  getSteps() {
    axios
      .get(`/subsections/${this.state.id}/steps/`)
      .then((response) => {
        const steps = response.data;
        this.setState({ steps });
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          console.error('getSteps not found!!!', error.response);
        } else {
          console.error('getSteps error!!!', error.response);
        }
      });
  }

  /**
   * render
   * @return {ReactElement} markup with list of blocks in subsection container
   */
  render() {
    const steps = [];
    let afterLast = false;
    this.state.steps.forEach((step, index) => {
      steps.push(
        <SubsectionBlock
          key={step.name}
          withSeparator={index !== this.state.steps.length - 1}
          type={step.type}
          isCompleted={step.isCompleted}
          isActive={!afterLast}
        >
          {step.name}
        </SubsectionBlock>,
      );
      if (!step.isCompleted) {
        afterLast = true;
      }
    });
    return (
      <Div className="subsection">
        <Div className="subsection__container">{steps}</Div>
      </Div>
    );
  }
}

export default Subsection;
