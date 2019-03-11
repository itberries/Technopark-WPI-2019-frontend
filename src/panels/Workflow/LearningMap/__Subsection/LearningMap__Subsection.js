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
     * constructor
     * @param {string} text button's text
     * @param {number} start button's start start position on LearningMap
     * @param {number} end button's end postion on LearningMap
     */
    const startPosClass = props.start === '' ? '' : `learningMap__col_start_${props.start}`;
    const endPosClass = props.end === '' ? '' : `learningMap__col_end_${props.end}`;
    this.state = {
      text: props.text,
      start: startPosClass,
      end: endPosClass,
    };
  }

  /**
   * render
   * @return {ReactElement} LearningMap's button block
   */
  render() {
    return (
      <div className={`learningMap__col ${this.state.start} ${this.state.end}`}>
        <Button className="learningMap__button">{this.state.text}</Button>
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
};

LearningMapSubsection.defaultProps = {
  text: 'subsection',
  start: '1',
  end: '2',
};

export default LearningMapSubsection;
