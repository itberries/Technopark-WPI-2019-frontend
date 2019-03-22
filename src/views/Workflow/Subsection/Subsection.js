import React from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
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
      id: this.props.id,
      steps: [
        {
          childId: 5,
          id: 4,
          name: 'fourth',
          parentId: 3,
          type: 'theory',
        },
        {
          childId: 4,
          id: 3,
          name: 'third',
          parentId: 2,
          type: 'training',
        },
        {
          childId: 2,
          id: 1,
          name: 'first',
          parentId: 'undefined',
          type: 'theory',
        },
        {
          childId: 'undefined',
          id: 6,
          name: 'sixth',
          parentId: 5,
          type: 'training',
        },
        {
          childId: 3,
          id: 2,
          name: 'second',
          parentId: 1,
          type: 'interactive',
        },
        {
          childId: 6,
          id: 5,
          name: 'fifth',
          parentId: 4,
          type: 'interactive',
        },
      ],
    };
    this.props.data.set('steps', this.state.steps);
  }

  componentDidMount() {
    this.getSteps();
  }

  /**
   * Get steps by subsection id from API
   * @memberof Subsection
   */
  getSteps() {
    axios
      .get(`/subsections/${this.state.id}/steps/`)
      .then((response) => {
        const steps = response.data;
        this.setState({ steps });
        this.props.data.set('steps', steps);
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
          onSelectStep={this.props.onSelectStep}
          id={step.id}
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

Subsection.propTypes = {
  id: PropTypes.number.isRequired,
  onSelectStep: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
};

export default Subsection;
