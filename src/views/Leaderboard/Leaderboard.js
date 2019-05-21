import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  View,
  Panel,
  PanelHeader,
  Group,
  Div,
  Tabs,
  TabsItem,
  List,
  Cell,
  Avatar,
} from '@vkontakte/vkui';

import SpinnerCentered from '../../common.blocks/SpinnerCentered/SpinnerCentered';

import { fetchTopUsers, fetchTopFriendsUsers } from '../../actions/leaderboard';

const mapStateToProps = (state) => {
  const {
    topUsersScoresList,
    topUsersInfoList,
    topFriendsUsersScoresList,
    topFriendsUsersInfoList,
  } = state.leaderboard;
  return {
    topUsersScoresList,
    topUsersInfoList,
    topFriendsUsersScoresList,
    topFriendsUsersInfoList,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchTopUsers,
    fetchTopFriendsUsers,
  },
  dispatch,
);

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTop: true,
      isLoadingFriends: true,
      activeTab: 'top',
    };
  }

  async componentDidMount() {
    const scroll = localStorage.getItem('scroll_leaderboard');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }

    await this.props.fetchTopUsers();
    await this.props.fetchTopFriendsUsers();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isLoadingTop === true && typeof nextProps.topUsersInfoList !== 'undefined') {
      this.setState({ isLoadingTop: false });
      return true;
    }

    if (
      this.state.isLoadingFriends === true
      && typeof nextProps.topFriendsUsersInfoList !== 'undefined'
    ) {
      this.setState({ isLoadingFriends: false });
      return true;
    }

    return true;
  }

  componentWillUnmount() {
    localStorage.setItem('scroll_leaderboard', window.scrollY);
  }

  generateLeaderboardCells(topScoresList, topInfoList) {
    let resultItems = [];
    if (
      Array.isArray(topScoresList)
      && Array.isArray(topInfoList)
      && topScoresList.length === topInfoList.length
    ) {
      resultItems = topScoresList.reduce((items, topUser, index) => {
        const name = `${topInfoList[index].first_name} ${topInfoList[index].last_name}`;
        items.push(
          <Cell before={<Avatar src={topInfoList[index].photo_100} />} indicator={topUser.score}>
            {name}
          </Cell>,
        );
        return items;
      }, resultItems);
    }
    return resultItems;
  }

  generateLeaderboard() {
    if (this.state.activeTab === 'friends') {
      const { topFriendsUsersScoresList, topFriendsUsersInfoList } = this.props;
      if (this.state.isLoadingFriends) {
        return <SpinnerCentered />;
      }
      return (
        <List>
          {this.generateLeaderboardCells(topFriendsUsersScoresList, topFriendsUsersInfoList)}
        </List>
      );
    }
    const { topUsersScoresList, topUsersInfoList } = this.props;
    if (this.state.isLoadingTop) {
      return <SpinnerCentered />;
    }
    return <List>{this.generateLeaderboardCells(topUsersScoresList, topUsersInfoList)}</List>;
  }

  render() {
    const topTabDesctiption = 'Топ-10 Лучших пользователей IT галактики Explority по количеству заработанных монеток!';
    const friendsTabDesctiption = 'Рейтинг среди ваших друзей по количеству заработанных монеток!';
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>Таблицы лидеров</PanelHeader>
          <Div>
            <Group
              description={
                this.state.activeTab === 'top' ? topTabDesctiption : friendsTabDesctiption
              }
            >
              <Tabs>
                <TabsItem
                  onClick={() => this.setState({ activeTab: 'top' })}
                  selected={this.state.activeTab === 'top'}
                >
                  ТОП-10
                </TabsItem>
                <TabsItem
                  onClick={() => this.setState({ activeTab: 'friends' })}
                  selected={this.state.activeTab === 'friends'}
                >
                  Среди друзей
                </TabsItem>
              </Tabs>
              {this.generateLeaderboard()}
            </Group>
          </Div>
        </Panel>
      </View>
    );
  }
}

Leaderboard.propTypes = {
  id: PropTypes.string.isRequired,
  fetchTopUsers: PropTypes.func.isRequired,
  fetchTopFriendsUsers: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
