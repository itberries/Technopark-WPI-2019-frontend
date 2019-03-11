import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__row.css';

const LearnMapRow = props => <div className="learnMap__row">{props.children}</div>;

LearnMapRow.propTypes = {
  children: PropTypes.node,
};

LearnMapRow.defaultProps = {
  children: '',
};

export default LearnMapRow;
