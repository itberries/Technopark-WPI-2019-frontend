import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import LearningMap from './LearningMap/LearningMap';
import Subsection from './Subsection/Subsection';

const Workflow = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Workflow</PanelHeader>
    <Subsection />
  </Panel>
);

Workflow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Workflow;
