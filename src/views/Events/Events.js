import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const Events = ({ id }) => (
  <View key={id} id={id} activePanel="events">
    <Panel id="events">
      <PanelHeader>Events</PanelHeader>
    </Panel>
  </View>
);

Events.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Events;
