import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import LearningMap from './LearningMap/LearningMap';

const Workflow = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Workflow</PanelHeader>
    <LearningMap />
  </Panel>
);

Workflow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Workflow;
