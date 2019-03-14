import React from 'react';
import PropTypes from 'prop-types';
import './MarkAsCompleted.scss';
import check from '../../images/common.blocks/MarkAsCompleted/Check.svg';

const MarkAsCompleted = ({ isCompleted, className }) => (
  <div className={`mark_container ${isCompleted ? 'mark_container-active' : ''} ${className}`}>
    <div className="markAsCompleted">
      <img src={check} alt="check icon" />
    </div>
    <div className="markShadow" />
  </div>
);

MarkAsCompleted.propTypes = {
  /* Description of prop "isCompleted". */
  isCompleted: PropTypes.bool,
  className: PropTypes.string,
};

MarkAsCompleted.defaultProps = {
  isCompleted: false,
  className: '',
};

export default MarkAsCompleted;
