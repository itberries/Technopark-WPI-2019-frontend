import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const Events = ({ viewData }) => (
  <View key={viewData.name} id={viewData.name} activePanel="events">
    <Panel id="events">
      <PanelHeader>Events</PanelHeader>
    </Panel>
  </View>
);

Events.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
};

export default Events;
