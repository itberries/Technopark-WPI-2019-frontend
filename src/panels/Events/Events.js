import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const Events = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Events</PanelHeader>
  </Panel>
);

Events.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Events;
