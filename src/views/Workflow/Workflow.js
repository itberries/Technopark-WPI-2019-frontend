import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel, PanelHeader, View, ConfigProvider,
} from '@vkontakte/vkui';
// import * as UI from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

import LearningMap from './LearningMap/LearningMap';
import Subsection from './Subsection/Subsection';
import Header from '../../common.blocks/Header/Header';

class Workflow extends React.Component {
  /**
   * Creates an instance of Workflow.
   * @param {object} props
   * @memberof Workflow
   */
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'learningmap',
      history: ['learningmap'],
    };
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  /**
   * Change the active panel in Workflow view
   * @param {string} id - subsection's id to open panel with corresponding subsection
   * @param {Event} e
   * @memberof Workflow
   */
  goBack(e) {
    console.log('back!');
    e.preventDefault();
    const history = [...this.state.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === 'learningmap') {
      connect.send('VKWebAppDisableSwipeBack');
    }
    this.setState({ history, activePanel });
  }

  goForward(activePanel, e) {
    console.log('forward!');
    e.preventDefault();
    const history = [...this.state.history];
    history.push(activePanel);
    if (this.state.activePanel === 'learningmap') {
      connect.send('VKWebAppEnableSwipeBack');
    }
    this.setState({ history, activePanel });
  }

  render() {
    return (
      <ConfigProvider isWebView>
        <View
          id="workflow"
          activePanel={this.state.activePanel}
          onSwipeBack={this.goBack}
          history={this.state.history}
        >
          <Panel id="learningmap">
            <PanelHeader>Learning Map</PanelHeader>
            <LearningMap onSelectSubsection={this.goForward} />
          </Panel>
          <Panel id="subsection">
            <Header text="Subsection" onBackClick={this.goBack} previousPanel="learningmap" />
            <Subsection />
          </Panel>
        </View>
      </ConfigProvider>
    );
  }
}

Workflow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Workflow;
