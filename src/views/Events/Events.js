import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  ConfigProvider, View, Panel, PanelHeader,
} from '@vkontakte/vkui';
import VKConnect from '../../vkconnect';

import Header from '../../common.blocks/Header/Header';
import EventsList from './__List/EventsList';
import Event from './Event/Event';

import {
  fetchEvents, selectEvent, unselectEvent, fetchEventById,
} from '../../actions/events';

const mapStateToProps = (state) => {
  const { eventsList, selectedEventId, selectedEventDetail } = state.events;
  return {
    eventsList,
    selectedEventId,
    selectedEventDetail,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchEvents,
    selectEvent,
    unselectEvent,
    fetchEventById,
  },
  dispatch,
);

class Events extends React.Component {
  constructor(props) {
    super(props);
    const historyMap = new Map();
    historyMap.set('events', 1);
    this.state = {
      isLoading: false,
      activeTab: 'all',
      activePanel: 'events',
      history: historyMap,
    };
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);
  }

  async componentDidMount() {
    const scroll = localStorage.getItem('scroll_events');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }

    if (typeof this.props.eventsList === 'undefined') {
      this.setState({
        isLoading: true,
      });
      await this.props.fetchEvents();
    }
  }

  componentWillUnmount() {
    localStorage.setItem('scroll_events', window.scrollY);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.isLoading === true
      && typeof nextProps.eventsList !== 'undefined'
      && prevState.eventsList !== nextProps.eventsList
    ) {
      return {
        ...prevState,
        isLoading: false,
      };
    }
    return null;
  }

  /**
   * Change the active panel in Events view
   * @param {string} id - event id to open panel with corresponding event description
   * @param {Event} e
   * @memberof Events
   */
  goBack(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState((prevState) => {
      let history = [...prevState.history];
      history.pop();
      const activePanel = history[history.length - 1][0];
      if (activePanel === 'events') {
        // VKConnect.send('VKWebAppDisableSwipeBack');
      } else {
        this.props.unselectEvent();
      }
      history = new Map(history);
      return { history, activePanel };
    });
  }

  goForward(activePanel, id, e) {
    e.preventDefault();
    this.setState((prevState) => {
      let history = [...prevState.history];
      history.push([activePanel, id]);
      if (prevState.activePanel === 'events') {
        // VKConnect.send('VKWebAppEnableSwipeBack');
      }
      history = new Map(history);
      return { history, activePanel };
    });
  }

  onSelectTab(selectedTab) {
    this.setState({ activeTab: selectedTab });
  }

  render() {
    return (
      <ConfigProvider isWebView>
        <View
          key={this.props.id}
          id={this.props.id}
          activePanel={this.state.activePanel}
          onSwipeBack={this.goBack}
          history={this.state.history}
        >
          <Panel id="events" key="events">
            <PanelHeader>События</PanelHeader>
            <EventsList
              activeTab={this.state.activeTab}
              onSelectTab={this.onSelectTab}
              onSelectEvent={(eventId, e) => {
                this.props.selectEvent(eventId);
                this.goForward('event', eventId, e);
              }}
              events={this.props.eventsList}
            />
          </Panel>
          <Panel id="event" key="event">
            <Header text="Событие" onBackClick={this.goBack} previousPanel="events" />
            <Event id={this.props.selectedEventId} key={this.props.selectedEventId} />
          </Panel>
        </View>
      </ConfigProvider>
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
