import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vkontakte/vkui';
import './Subsection__Block.scss';
import MarkAsCompleted from '../../../../common.blocks/MarkAsCompleted/MarkAsCompleted';

/**
 * Subsection's block component with button and separator
 * @param {bool} withSeparator flag if separator is needed
 * @param {string} type type of section content (theory/interactive/training)
 * @param {string} children button text content
 * @param {boolean} isCompleted is block complite
 * @return {ReactElement} markup with subsection's block
 */
const SubsectionBlock = ({
  withSeparator, type, children, isCompleted, isActive,
}) => (
  <div className="subsection__block">
    <div className="subsection__block_wrapper">
      <MarkAsCompleted className="subsection__block_mark" isCompleted={isCompleted} />
      <Button
        className={`subsection__button ${
          isActive ? 'subsection__button-active' : ''
        } subsection__button-${type}`}
      >
        {children}
      </Button>
    </div>
    {withSeparator && (
      <hr
        className={`subsection__separator ${isCompleted ? 'subsection__separator-active' : ''}`}
      />
    )}
  </div>
);

SubsectionBlock.propTypes = {
  /** Description of prop "withSeparator". */
  withSeparator: PropTypes.bool,
  /** Description of prop "type". */
  type: PropTypes.string.isRequired,
  /** Description of prop "children". */
  children: PropTypes.string.isRequired,
  /** Description of prop "isCompleted". */
  isCompleted: PropTypes.bool,
  /** Description of prop "isActive". */
  isActive: PropTypes.bool,
};

SubsectionBlock.defaultProps = {
  withSeparator: true,
  isCompleted: false,
  isActive: false,
};

export default SubsectionBlock;
