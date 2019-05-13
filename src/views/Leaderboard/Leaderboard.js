import React from 'react';
import PropTypes from 'prop-types';

import { View, Panel, PanelHeader } from '@vkontakte/vkui';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>Лидеры</PanelHeader>
        </Panel>
      </View>
    );
  }
}

Leaderboard.propTypes = {
  id: PropTypes.string.isRequired,
};

Leaderboard.defaultProps = {};

export default Leaderboard;
