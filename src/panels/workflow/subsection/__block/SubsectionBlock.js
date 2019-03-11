import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vkontakte/vkui';
import './SubsectionBlock.scss';

/**
 * Subsection's block component with button and separator
 * @param {bool} withSeparator flag if separator is needed
 * @param {string} type type of section content (theory/interactive/training)
 * @param {string} children button text content
 * @return {ReactElement} markup with subsection's block
 */
const SubsectionBlock = ({ withSeparator, type, children }) => (
  <div className="subsection__block">
    <Button className={`subsection__button subsection__button-${type}`}>{children}</Button>
    {withSeparator && <hr className="subsection__separator" />}
  </div>
);

SubsectionBlock.propTypes = {
  /** Description of prop "withSeparator". */
  withSeparator: PropTypes.bool,
  /** Description of prop "type". */
  type: PropTypes.string.isRequired,
  /** Description of prop "children". */
  children: PropTypes.string.isRequired,
};

SubsectionBlock.defaultProps = {
  withSeparator: true,
};

export default SubsectionBlock;
