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

import { fetchTopUsers } from '../../actions/leaderboard';

const mapStateToProps = (state) => {
  const { topUsersScoresList, topUsersInfoList } = state.leaderboard;
  return {
    topUsersScoresList,
    topUsersInfoList,
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
    console.log('LB DID MOUNT AFTER FETCH TOP');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('LB SHOULD UPDATE?', nextProps, nextState);
    console.log('LB SHOULD UPDATE current', this.props, this.state);

    if (this.state.isLoading === true && typeof nextProps.topUsersInfoList !== 'undefined') {
      console.log('LB onOpponentInfoReceived');
      this.onOpponentInfoReceived();
      this.setState({ isLoading: false });
      console.log('LB isSentMsgReadyToStart set true');
      return true;
    }
    return true;
  }

  componentWillUnmount() {
    localStorage.setItem('scroll', window.scrollY);
  }

  generateLeaderboard() {
    console.log('LB generateLeaderboard');
    return this.state.activeTab === 'top' ? (
      <List>
        <Cell
          before={
            <Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />
          }
          indicator="100500"
        >
          Евгений Авсиевич
        </Cell>
        <Cell
          before={
            <Avatar src="https://pp.userapi.com/c636327/v636327034/2be85/gt3uFFWTw-w.jpg?ava=1" />
          }
          indicator="100300"
        >
          Татьяна Плуталова
        </Cell>
        <Cell
          before={
            <Avatar src="https://pp.userapi.com/c841629/v841629884/290ab/STZCXV5wZbg.jpg?ava=1" />
          }
          indicator="100000"
        >
          Олег Илларианов
        </Cell>
      </List>
    ) : (
      <List>
        <Cell
          before={
            <Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />
          }
          indicator="1000"
        >
          Евгений Авсиевич
        </Cell>
        <Cell
          before={
            <Avatar src="https://pp.userapi.com/c636327/v636327034/2be85/gt3uFFWTw-w.jpg?ava=1" />
          }
          indicator="900"
        >
          Татьяна Плуталова
        </Cell>
      </List>
    );
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
