import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import SpinnerCentered from '../../common.blocks/SpinnerCentered/SpinnerCentered';

import { fetchTopUsers } from '../../actions/leaderboard';

const mapStateToProps = (state) => {
  const { topUsersList } = state.leaderboard;
  return {
    topUsersList,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchTopUsers,
  },
  dispatch,
);

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (typeof this.props.topUsersList === 'undefined') {
      this.setState({
        isLoading: true,
      });
      await this.props.fetchTopUsers();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.isLoading === true
      && typeof nextProps.topUsersList !== 'undefined'
      && prevState.topUsersList !== nextProps.topUsersList
    ) {
      return {
        ...prevState,
        isLoading: false,
      };
    }
    return null;
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
  fetchTopUsers: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
