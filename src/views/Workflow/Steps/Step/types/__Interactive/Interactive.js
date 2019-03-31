import React from 'react';
import PropTypes from 'prop-types';

import Theory from '../__Theory/Theory';
import MiniGames from './MiniGame';

class Interactive extends React.Component {
  getGameType() {
    return 'match';
  }

  render() {
    return (
      <React.Fragment>
        <Theory id={this.props.id} />
        <MiniGames id={this.props.id} type={this.getGameType()} />
      </React.Fragment>
    );
  }
}

Interactive.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Interactive;
