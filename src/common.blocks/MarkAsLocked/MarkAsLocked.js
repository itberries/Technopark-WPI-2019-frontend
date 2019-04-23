import React from 'react';
import PropTypes from 'prop-types';

import './MarkAsLocked.scss';

import locked from '../../images/icons/locked.svg';

const MarkAsLocked = ({ isLocked, className }) => (
  <div className={`mark_container ${isLocked ? 'mark_container-active' : ''} ${className}`}>
    <div className="markAsLocked">
      <img src={locked} alt="locked icon" />
    </div>
  </div>
);

MarkAsLocked.propTypes = {
  /* Description of prop "isLocked". */
  isLocked: PropTypes.bool,
  className: PropTypes.string,
};

MarkAsLocked.defaultProps = {
  isLocked: false,
  className: '',
};

export default MarkAsLocked;
