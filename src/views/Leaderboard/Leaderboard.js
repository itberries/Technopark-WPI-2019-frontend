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
  const { topUserScoresList, topUserInfoList } = state.leaderboard;
  return {
    topUserScoresList,
    topUserInfoList,
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
      topUserScoresList: undefined,
      topUserInfoList: undefined,
    };
  }

  async componentDidMount() {
    const scroll = localStorage.getItem('scroll');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }

    console.log('LEADERBOARD did mount state, props:', this.state, this.props);
    if (
      typeof this.props.topUserScoresList === 'undefined'
      && typeof this.props.topUserInfoList === 'undefined'
    ) {
      this.setState({
        isLoading: true,
      });
      await this.props.fetchTopUsers();
    }
  }

  componentWillUnmount() {
    localStorage.setItem('scroll', window.scrollY);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('LEADERBOARD getDerivedStateFromProps prevState, nextProps:', prevState, nextProps);
    if (
      prevState.isLoading === true
      && typeof nextProps.topUserScoresList !== 'undefined'
      && typeof nextProps.topUserInfoList !== 'undefined'
      && prevState.topUserScoresList !== nextProps.topUserScoresList
    ) {
      console.log('LEADERBOARD getDerivedStateFromProps in IF');
      return {
        ...prevState,
        topUserInfoList: nextProps.topUserInfoList,
        topUserScoresList: nextProps.topUserScoresList,
        isLoading: false,
      };
    }
    console.log('LEADERBOARD getDerivedStateFromProps in ELSE');
    return null;
  }

  render() {
    console.log('LEADERBOARD RENDER props: ', this.props);
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
              {this.state.activeTab === 'top' ? (
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
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />
                    }
                    indicator="80500"
                  >
                    Евгений Авсиевич
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c636327/v636327034/2be85/gt3uFFWTw-w.jpg?ava=1" />
                    }
                    indicator="70000"
                  >
                    Татьяна Плуталова
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c841629/v841629884/290ab/STZCXV5wZbg.jpg?ava=1" />
                    }
                    indicator="55000"
                  >
                    Олег Илларианов
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />
                    }
                    indicator="30000"
                  >
                    Евгений Авсиевич
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c636327/v636327034/2be85/gt3uFFWTw-w.jpg?ava=1" />
                    }
                    indicator="26000"
                  >
                    Татьяна Плуталова
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c841629/v841629884/290ab/STZCXV5wZbg.jpg?ava=1" />
                    }
                    indicator="10000"
                  >
                    Олег Илларианов
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />
                    }
                    indicator="7000"
                  >
                    Евгений Авсиевич
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
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c841629/v841629884/290ab/STZCXV5wZbg.jpg?ava=1" />
                    }
                    indicator="700"
                  >
                    Олег Илларианов
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />
                    }
                    indicator="600"
                  >
                    Евгений Авсиевич
                  </Cell>
                  <Cell
                    before={
                      <Avatar src="https://pp.userapi.com/c636327/v636327034/2be85/gt3uFFWTw-w.jpg?ava=1" />
                    }
                    indicator="500"
                  >
                    Татьяна Плуталова
                  </Cell>
                </List>
              )}
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
