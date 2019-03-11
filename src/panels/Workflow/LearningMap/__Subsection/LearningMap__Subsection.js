import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vkontakte/vkui';
import './LearningMap__Subsection.scss';

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
     * @property {string} text button's text
     * @property {string} start button's start start position on LearningMap
     * @property {string} end button's end postion on LearningMap
     * @property {bool} isActive is subsection active or not
     */
    this.state = {
      text: props.text,
      start: `learningMap__col_start_${props.start}`,
      end: `learningMap__col_end_${props.end}`,
      isActive: props.isActive,
    };
  }

  /**
   * render
   * @return {ReactElement} LearningMap's subsection block with button
   */
  render() {
    return (
      <div className={`learningMap__col ${this.state.start} ${this.state.end}`}>
        <Button
          className={`learningMap__button learningMap__button-${
            this.state.isActive ? 'active' : 'unactive'
          }`}
        >
          {this.state.text}
        </Button>
      </div>
    );
  }
}

LearningMapSubsection.propTypes = {
  /* Description of prop "text". */
  text: PropTypes.string,
  /* Description of prop "start". */
  start: PropTypes.string,
  /* Description of prop "end". */
  end: PropTypes.string,
  /* Description of prop "isActive". */
  isActive: PropTypes.bool,
};

LearningMapSubsection.defaultProps = {
  text: 'subsection',
  start: '1',
  end: '2',
  isActive: false,
};

export default LearningMapSubsection;
