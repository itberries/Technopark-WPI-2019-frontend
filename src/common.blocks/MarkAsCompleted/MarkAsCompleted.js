import React from 'react';
import PropTypes from 'prop-types';
import './MarkAsCompleted.scss';
import check from '../../images/common.blocks/MarkAsCompleted/Check.svg';

const MarkAsCompleted = ({ margin, isCompleted, className }) => {
  const divStyle = {
    right: `${margin}vmin`,
  };
  return (
    <div
      className={`mark_container ${isCompleted ? 'mark_container-active' : ''} ${className}`}
      style={divStyle}
    >
      <div className="markAsCompleted">
        <img src={check} alt="check icon" />
      </div>
      <div className="markShadow" />
    </div>
  );
};

MarkAsCompleted.propTypes = {
  /* Description of prop "isCompleted". */
  margin: PropTypes.number,
  isCompleted: PropTypes.bool,
  className: PropTypes.string,
};

MarkAsCompleted.defaultProps = {
  margin: null,
  isCompleted: false,
  className: '',
};

export default MarkAsCompleted;
