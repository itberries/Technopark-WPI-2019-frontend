import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';
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
   * @param {string} id - subsection's id to open panel with corresponding subsection
   * @param {Event} e
   * @memberof Workflow
   */
  onPanelChange(id, e) {
    e.preventDefault();
    this.setState({ activePanel: 'subsection' });
  }

  render() {
    return (
      <View id={this.props.id} activePanel={this.state.activePanel}>
        <Panel id="learningmap">
          <PanelHeader>Learning Map</PanelHeader>
          <LearningMap onSelectSubsection={this.onPanelChange} />
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
  id: PropTypes.string.isRequired,
};

export default Workflow;
