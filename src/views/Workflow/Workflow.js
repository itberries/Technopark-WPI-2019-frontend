import React from 'react';
import PropTypes from 'prop-types';

import connect from '@vkontakte/vkui-connect';

import {
  Panel, PanelHeader, View, ConfigProvider,
} from '@vkontakte/vkui';

import LearningMap from './LearningMap/LearningMap';
import Subsection from './Subsection/Subsection';
import Header from '../../common.blocks/Header/Header';
import Steps from './Steps/Steps';

/**
 * Workflow component for learning process, includes sections and their subsections
 */
class Workflow extends React.Component {
  /**
   * Creates an instance of Workflow.
   * @param {object} props
   * @memberof Workflow
   */
  constructor(props) {
    super(props);
    const map = new Map();
    map.set('learningmap', 1);
    this.state = {
      activePanel: 'learningmap',
      history: map,
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
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState((prevState) => {
      let history = [...prevState.history];
      history.pop();
      const activePanel = history[history.length - 1][0];
      if (activePanel === 'learningmap') {
        connect.send('VKWebAppDisableSwipeBack');
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
      if (prevState.activePanel === 'learningmap') {
        connect.send('VKWebAppEnableSwipeBack');
      }
      history = new Map(history);
      return { history, activePanel };
    });
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
          <Panel id="learningmap" key="learningmap">
            <PanelHeader>Путешествие к IT звездам</PanelHeader>
            <LearningMap onSelectSubsection={this.goForward} />
          </Panel>
          <Panel id="subsection" key="subsection">
            <Header
              text="Подсекция обучения"
              onBackClick={this.goBack}
              previousPanel="learningmap"
            />
            <Subsection id={this.state.history.get('subsection')} onSelectStep={this.goForward} />
          </Panel>
          <Panel id="steps" key="steps">
            <Header text="Шаг обучения" onBackClick={this.goBack} previousPanel="learningmap" />
            <Steps id={this.state.history.get('steps')} goBack={this.goBack} />
          </Panel>
        </View>
      </ConfigProvider>
    );
  }
}

export default Workflow;
