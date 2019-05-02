import React from 'react';
import PropTypes from 'prop-types';
import {
  Div, Group, View, Panel, PanelHeader,
} from '@vkontakte/vkui';

import Map from './__Map/__Map';
import Timer from './__Timer/__Timer';

import './Games.scss';

class Games extends React.Component {
  render() {
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>Игры с друзьями</PanelHeader>
          <Map />
          <Timer />
          <Group>
            <Div>Game</Div>
          </Group>
        </Panel>
      </View>
    );
  }
}

Games.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Games;
