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
    topFriendsScoresList,
    topFriendsInfoList,
  } = state.leaderboard;
  return {
    topUsersScoresList,
    topUsersInfoList,
    topFriendsScoresList,
    topFriendsInfoList,
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
      isLoading: true,
      activeTab: 'top',
    };
  }

  async componentDidMount() {
    const scroll = localStorage.getItem('scroll');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }

    console.log('LB DID MOUNT BEFORE FETCH TOP');
    await this.props.fetchTopUsers();
    await this.props.fetchTopFriendsUsers();
    console.log('LB DID MOUNT AFTER FETCH TOP');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('LB SHOULD UPDATE?', nextProps, nextState);
    console.log('LB SHOULD UPDATE current', this.props, this.state);

    if (
      this.state.isLoading === true
      && typeof nextProps.topUsersInfoList !== 'undefined'
      && typeof nextProps.topFriendsInfoList !== 'undefined'
    ) {
      this.setState({ isLoading: false });
      console.log('LB isLoading set false');
      return true;
    }
    return true;
  }

  componentWillUnmount() {
    localStorage.setItem('scroll', window.scrollY);
  }

  generateLeaderboardCells(topScoresList, topInfoList) {
    console.log('LB Cells generate props:', this.props);

    let resultItems = [];
    if (
      Array.isArray(topScoresList)
      && Array.isArray(topInfoList)
      && topScoresList.length === topInfoList.length
    ) {
      resultItems = topScoresList.reduce((items, topUser, index) => {
        console.log('LB Cells generate items, topUser, index:', items, topUser, index);
        const name = `${topInfoList[index].first_name} ${topInfoList[index].last_name}`;
        items.push(
          <Cell before={<Avatar src={topInfoList[index].photo_100} />} indicator={topUser.score}>
            {name}
          </Cell>,
        );
        return items;
      }, resultItems);
    }
    console.log('LB Cells generate before return items: ', resultItems);
    return resultItems;
  }

  generateLeaderboard() {
    console.log('LB generateLeaderboard');
    if (this.state.activeTab === 'friends') {
      const { topFriendsScoresList, topFriendsInfoList } = this.props;
      return <List>{this.generateLeaderboardCells(topFriendsScoresList, topFriendsInfoList)}</List>;
    }
    const { topUsersScoresList, topUsersInfoList } = this.props;
    return <List>{this.generateLeaderboardCells(topUsersScoresList, topUsersInfoList)}</List>;
  }

  render() {
    console.log('LEADERBOARD RENDER state props: ', this.state, this.props);
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
              {this.state.isLoading === true ? <SpinnerCentered /> : this.generateLeaderboard()}
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
