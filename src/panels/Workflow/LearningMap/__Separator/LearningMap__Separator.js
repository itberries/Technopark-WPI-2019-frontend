import React from 'react';
import PropTypes from 'prop-types';
import './LearningMap__Separator.scss';

/**
 * LearningMap's block component with title and separator
 * @param {string} text separator title
 * @return {ReactElement} separator's block
 */
const LearningMapSeparator = ({ text }) => (
  <div className="learningMap__separator">
    <div className="separator__text">{text}</div>
    <div className="separator__line">
      <hr />
    </div>
  </div>
);

LearningMapSeparator.propTypes = {
  /* Description of prop "text". */
  text: PropTypes.string.isRequired,
};

export default LearningMapSeparator;
