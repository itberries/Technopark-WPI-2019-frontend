import React from 'react';
import PropTypes from 'prop-types';
import './LearningMap__Row.scss';

/**
 * LearningMap's block component
 * @param {string} children inner content
 * @return {ReactElement} learnMap's row
 */
const LearningMapRow = props => <div className="learnMap__row">{props.children}</div>;

LearningMapRow.propTypes = {
  /* Description of prop "children". */
  children: PropTypes.node,
};

LearningMapRow.defaultProps = {
  children: '',
};

export default LearningMapRow;
