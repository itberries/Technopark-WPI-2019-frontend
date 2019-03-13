import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const Games = ({ id }) => (
  <View key={id} id={id} activePanel="games">
    <Panel id="games">
      <PanelHeader>Games</PanelHeader>
    </Panel>
  </View>
);

Games.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Games;
