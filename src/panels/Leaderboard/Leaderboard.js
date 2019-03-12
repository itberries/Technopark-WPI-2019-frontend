import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const LeaderBoard = ({ viewData }) => (
  <View key={viewData.name} id={viewData.name} activePanel="leaderboard">
    <Panel id="leaderboard">
      <PanelHeader>LeaderBoard</PanelHeader>
    </Panel>
  </View>
);

LeaderBoard.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
};

export default LeaderBoard;
