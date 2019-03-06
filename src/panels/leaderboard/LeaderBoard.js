import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const LeaderBoard = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>LeaderBoard</PanelHeader>
  </Panel>
);

LeaderBoard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LeaderBoard;
