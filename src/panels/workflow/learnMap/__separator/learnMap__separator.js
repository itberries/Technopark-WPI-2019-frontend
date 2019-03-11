import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__separator.css';

const LearnMapSeparator = ({ text }) => (
  <div className="learnMap__separator">
    <div className="separator__text">{text}</div>
    <div className="separator__line">
      <hr />
    </div>
  </div>
);

LearnMapSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LearnMapSeparator;
