import React from 'react';
// import PropTypes from 'prop-types';
import {
  Panel, PanelHeader, View, ConfigProvider,
} from '@vkontakte/vkui';
// import * as UI from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

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
    const dates = new Map();
    map.set('learningmap', 1);
    this.state = {
      activePanel: 'learningmap',
      history: map,
      panelsData: dates,
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
    console.log('forward!');
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
          <Panel id="learningmap">
            <PanelHeader>Learning Map</PanelHeader>
            <LearningMap onSelectSubsection={this.goForward} data={this.state.panelsData} />
          </Panel>
          <Panel id="subsection">
            <Header text="Subsection" onBackClick={this.goBack} previousPanel="learningmap" />
            <Subsection
              id={this.state.history.get('subsection')}
              onSelectStep={this.goForward}
              data={this.state.panelsData}
            />
          </Panel>
          <Panel id="steps">
            <Header text="Steps" onBackClick={this.goBack} previousPanel="learningmap" />
            <Steps
              id={this.state.history.get('steps')}
              arrayOfSteps={this.state.panelsData.get('steps')}
            />
          </Panel>
        </View>
      </ConfigProvider>
    );
  }
}

/*
Workflow.propTypes = {
  id: PropTypes.string.isRequired,
};
*/

export default Workflow;
