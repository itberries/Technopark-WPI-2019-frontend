import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__subsection.css';

import { Button } from '@vkontakte/vkui';

/**
 * LearnMap's block component with button
 */
class LearnMapSubsection extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * constructor
     * @param {string} text button's text
     * @param {number} start button's start start position on LearnMap
     * @param {number} end button's end postion on LearnMap
     */
    const startPosClass = props.start === '' ? '' : `learnMap__col_start_${props.start}`;
    const endPosClass = props.end === '' ? '' : `learnMap__col_end_${props.end}`;
    this.state = {
      text: props.text,
      start: startPosClass,
      end: endPosClass,
    };
  }

  /**
   * render
   * @return {ReactElement} LearnMap's button block
   */
  render() {
    return (
      <div className={`learnMap__col ${this.state.start} ${this.state.end}`}>
        <Button className="learnMap__button">{this.state.text}</Button>
      </div>
    );
  }
}

LearnMapSubsection.propTypes = {
  /* Description of prop "text". */
  text: PropTypes.string,
  /* Description of prop "start". */
  start: PropTypes.string,
  /* Description of prop "end". */
  end: PropTypes.string,
};

LearnMapSubsection.defaultProps = {
  text: 'subsection',
  start: '1',
  end: '2',
};

export default LearnMapSubsection;
