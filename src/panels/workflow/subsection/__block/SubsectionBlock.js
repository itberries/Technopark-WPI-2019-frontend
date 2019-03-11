import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './SubsectionBlock.scss';

const SubsectionBlock = ({ withSeparator, type, children }) => (
  <div className="subsection__block">
    <Button className={`subsection__button subsection__button-${type}`}>{children}</Button>
    {withSeparator && <hr className="subsection__separator" />}
  </div>
);

SubsectionBlock.propTypes = {
  withSeparator: PropTypes.bool,
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

SubsectionBlock.defaultProps = {
  withSeparator: true,
};

export default SubsectionBlock;
