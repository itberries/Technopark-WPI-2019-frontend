import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './LearningMap__Subsection.scss';
import MarkAsCompleted from '../../../../common.blocks/MarkAsCompleted/MarkAsCompleted';

/**
 * LearningMap's block component with button
 */
class LearningMapSubsection extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * @type {object}
     * @property {string} id subsection id to send it to button onClick callback
     * @property {string} name subsection name, equal to button's text
     * @property {string} start button's start position on LearningMap
     * @property {string} end button's end postion on LearningMap
     * @property {bool} isActive is subsection active or not
     * @property {bool} isCurrent is subsection current learning block or not
     * @property {bool} isCompleted is learning of this subsection completed or not
     */
    this.state = {
      id: props.id,
      name: props.name,
      start: props.start,
      end: props.end,
      isActive: props.isActive,
      isCurrent: props.isCurrent,
      isCompleted: props.isCompleted,
    };
  }

  /**
   * render
   * @return {ReactElement} LearningMap's subsection block with button
   */
  render() {
    return (
      <div
        className={`learningMap__col learningMap__col_start_${
          this.state.start
        } learningMap__col_end_${this.state.end}`}
      >
        <div className="LearningMap__Subsection_wrapper">
          <MarkAsCompleted
            isCompleted={this.state.isCompleted}
            className="LearningMap__Subsection_mark"
          />
          <Button
            className={`learningMap__button${
              this.state.isActive ? ' learningMap__button-active' : ''
            } ${this.state.isCurrent ? 'learningMap__button-current' : ''} ${
              this.state.isCompleted ? 'learningMap__button-completed' : ''
            }`}
          >
            {this.state.name}
          </Button>
        </div>
      </div>
    );
  }
}

LearningMapSubsection.propTypes = {
  /* Description of prop "id". */
  id: PropTypes.string.isRequired,
  /* Description of prop "name". */
  name: PropTypes.string,
  /* Description of prop "start". */
  start: PropTypes.string,
  /* Description of prop "end". */
  end: PropTypes.string,
  /* Description of prop "isActive". */
  isActive: PropTypes.bool,
  /* Description of prop "isCurrent". */
  isCurrent: PropTypes.bool,
  /* Description of prop "isCompleted". */
  isCompleted: PropTypes.bool,
  /* Description of prop "onSelectSubsection". */
  onSelectSubsection: PropTypes.func,
};

LearningMapSubsection.defaultProps = {
  name: 'subsection',
  start: '1',
  end: '2',
  isActive: false,
  isCurrent: false,
  isCompleted: false,
  onSelectSubsection: () => null,
};

export default LearningMapSubsection;
