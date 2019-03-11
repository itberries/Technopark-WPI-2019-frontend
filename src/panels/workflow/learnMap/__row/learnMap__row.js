import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__row.css';

/**
 * LearnMap's block component
 * @param {string} children inner content
 * @return {ReactElement} learnMap's row
 */
const LearnMapRow = props => <div className="learnMap__row">{props.children}</div>;

LearnMapRow.propTypes = {
  /* Description of prop "children". */
  children: PropTypes.node,
};

LearnMapRow.defaultProps = {
  children: '',
};

export default LearnMapRow;
