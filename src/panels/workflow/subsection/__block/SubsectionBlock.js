import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './SubsectionBlock.scss';

const SubsectionBlock = ({ type, children }) => (
  <div className="subsection__block">
    <Button className={`subsection__button subsection__button-${type}`}>{children}</Button>
    <hr className="subsection__separator" />
  </div>
);

SubsectionBlock.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default SubsectionBlock;
