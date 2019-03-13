import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const LeaderBoard = ({ id }) => (
  <View key={id} id={id} activePanel="leaderboard">
    <Panel id="leaderboard">
      <PanelHeader>LeaderBoard</PanelHeader>
    </Panel>
  </View>
);

LeaderBoard.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
};

export default LeaderBoard;
