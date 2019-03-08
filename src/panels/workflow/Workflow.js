import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import LearnMap from './learnMap/learnMap';

const Workflow = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Workflow</PanelHeader>
    <LearnMap />
  </Panel>
);

Workflow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Workflow;
