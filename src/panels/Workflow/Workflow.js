import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';
// import * as UI from '@vkontakte/vkui';
import LearningMap from './LearningMap/LearningMap';
import Subsection from './Subsection/Subsection';

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
   * @param {Event} e
   * @memberof Workflow
   */
  onPanelChange(e) {
    console.log('onPanelChange');
    this.setState({ activePanel: e.currentTarget.panelId });
    /* TODO: need to pass panel id from subcection button */
  }

  render() {
    console.log('render');
    return (
      <View id="workflow" activePanel={this.state.activePanel}>
        <Panel id="learningmap">
          <PanelHeader>Learning Map</PanelHeader>
          <LearningMap />
        </Panel>
        <Panel id="subsection">
          <PanelHeader>Subsection</PanelHeader>
          <Subsection />
        </Panel>
      </View>
    );
  }
}

Workflow.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
};

export default Workflow;
