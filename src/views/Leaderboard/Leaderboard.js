import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

const LeaderBoard = ({ id }) => (
  <View key={id} id={id} activePanel={id}>
    <Panel id={id}>
      <PanelHeader>LeaderBoard</PanelHeader>
    </Panel>
  </View>
);

LeaderBoard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LeaderBoard;
