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
  HorizontalScroll,
  TabsItem,
  List,
  Cell,
  Avatar,
} from '@vkontakte/vkui';

const mapStateToProps = (state) => {
  const { topUsersList } = state.leaderboard;
  return {
    topUsersList,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeTab: 'all',
    };
  }

  async componentDidMount() {
    const scroll = localStorage.getItem('scroll');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }

    // TODO: load events using api
  }

  componentWillUnmount() {
    localStorage.setItem('scroll', window.scrollY);
  }

  render() {
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>События</PanelHeader>
          <Div>
            <Group>
              <Tabs type="buttons">
                <HorizontalScroll>
                  <TabsItem
                    onClick={() => this.setState({ activeTab: 'all' })}
                    selected={this.state.activeTab === 'all'}
                  >
                    Все
                  </TabsItem>
                  <TabsItem
                    onClick={() => this.setState({ activeTab: 'soon' })}
                    selected={this.state.activeTab === 'soon'}
                  >
                    Ближайшие
                  </TabsItem>
                </HorizontalScroll>
              </Tabs>
              <List>
                <Cell
                  description="21 июня 2019 в 09:00, Москва"
                  before={(
                    <Avatar
                      src="https://files.startupranking.com/startup/thumb/46467_60b7bdd08d1b5ae1e87f4dc39e96a8c91653e1e7_mail-ru-group_m.png"
                      size={80}
                    />
)}
                  size="l"
                  multiline
                  expandable
                  onClick={() => this.setState({ activePanel: 'event' })}
                >
                  Открытая экскурсия в Mail.Ru Group
                </Cell>
                <Cell
                  description="7 июня 2019 в 09:00, Москва"
                  before={(
                    <Avatar
                      src="https://files.startupranking.com/startup/thumb/46467_60b7bdd08d1b5ae1e87f4dc39e96a8c91653e1e7_mail-ru-group_m.png"
                      size={80}
                    />
)}
                  size="l"
                  multiline
                  expandable
                  onClick={() => this.setState({ activePanel: 'event' })}
                >
                  Открытая экскурсия в Mail.Ru Group
                </Cell>
                <Cell
                  description="лето 2019, Москва"
                  before={(
                    <Avatar
                      src="https://static.tildacdn.com/tild3661-3932-4565-b765-616332623730/Codabra_Logo_Codabr.png"
                      size={80}
                    />
)}
                  size="l"
                  multiline
                  expandable
                  onClick={() => this.setState({ activePanel: 'event' })}
                >
                  Лагерь цифровых профессий Кодабра
                </Cell>
              </List>
            </Group>
          </Div>
        </Panel>
      </View>
    );
  }
}

Events.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Events);
