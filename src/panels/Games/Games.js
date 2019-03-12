import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const Games = ({ viewData }) => (
  <View key={viewData.name} id={viewData.name} activePanel="games">
    <Panel id="games">
      <PanelHeader>Games</PanelHeader>
    </Panel>
  </View>
);

Games.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
};
export default Games;
