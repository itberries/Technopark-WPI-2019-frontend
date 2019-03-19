import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vkontakte/vkui';
import './Subsection__Block.scss';
import { NONAME } from 'dns';
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
  withSeparator,
  type,
  children,
  isCompleted,
  isActive,
  onSelectStep,
  id,
}) => (
  <div className="subsection__block">
    <div className="subsection__block_wrapper">
      <MarkAsCompleted className="subsection__block_mark" isCompleted={isCompleted} />
      <Button
        className={`subsection__button ${
          isActive ? 'subsection__button-active' : ''
        } subsection__button-${type}`}
        onClick={(e) => {
          const stepId = id;
          console.log('on click subsection button');
          console.log(
            onSelectStep(
              'step',
              {
                id: stepId,
              },
              e,
            ),
          );
        }}
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
  /** Description of prop "isActive". */
  onSelectStep: PropTypes.func,
  /** Description of prop "isActive". */
  id: PropTypes.number.isRequired,
};

SubsectionBlock.defaultProps = {
  withSeparator: true,
  isCompleted: false,
  isActive: false,
  onSelectStep: null,
};

export default SubsectionBlock;
