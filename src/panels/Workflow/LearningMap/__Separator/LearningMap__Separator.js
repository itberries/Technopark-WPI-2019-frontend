import React from 'react';
import PropTypes from 'prop-types';
import './LearningMap__Separator.scss';

/**
 * LearningMap's block component with title and separator
 * @param {string} name separator title
 * @return {ReactElement} separator's block
 */
const LearningMapSeparator = ({ name, isActive }) => (
  <div className="learningMap__separator separator">
    <div className={`separator__text${isActive ? ' separator__text-active' : ''}`}>{name}</div>
    <div className={`separator__line${isActive ? ' separator__line-active' : ''}`}>
      <hr />
    </div>
  </div>
);

LearningMapSeparator.propTypes = {
  /* Description of prop "text". */
  name: PropTypes.string.isRequired,
  /* Description of prop "isActive". */
  isActive: PropTypes.string,
};

LearningMapSeparator.defaultProps = {
  isActive: false,
};

export default LearningMapSeparator;
