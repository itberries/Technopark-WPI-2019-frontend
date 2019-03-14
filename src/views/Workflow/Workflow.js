import React from 'react';
// import PropTypes from 'prop-types';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';
// import * as UI from '@vkontakte/vkui';
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
    };
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  /**
   * Change the active panel in Workflow view
   * @param {string} id - subsection's id to open panel with corresponding subsection
   * @param {Event} e
   * @memberof Workflow
   */
  onPanelChange(id, e) {
    console.log('onPanelChange with subsection id = ', id);
    e.preventDefault();
    this.setState({ activePanel: id });
  }

  render() {
    console.log('render workflow');
    return (
      <View id="workflow" activePanel={this.state.activePanel}>
        <Panel id="learningmap">
          <PanelHeader>Learning Map</PanelHeader>
          <LearningMap onSelectSubsection={this.onPanelChange} />
        </Panel>
        <Panel id="subsection">
          <Header text="Subsection" onBackClick={this.onPanelChange} previousPanel="learningmap" />
          <Subsection />
        </Panel>
      </View>
    );
  }
}

/*
Workflow.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
};
*/

export default Workflow;
