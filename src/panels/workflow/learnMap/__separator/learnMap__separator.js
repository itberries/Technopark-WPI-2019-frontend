import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__separator.css';

/**
 * LearnMap's block component with title and separator
 * @param {string} text separator title
 * @return {ReactElement} separator's block
 */
const LearnMapSeparator = ({ text }) => (
  <div className="learnMap__separator">
    <div className="separator__text">{text}</div>
    <div className="separator__line">
      <hr />
    </div>
  </div>
);

LearnMapSeparator.propTypes = {
  /* Description of prop "text". */
  text: PropTypes.string.isRequired,
};

export default LearnMapSeparator;
