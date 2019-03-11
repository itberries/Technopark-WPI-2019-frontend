import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

import Subsection from './subsection/Subsection';

const Workflow = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Subsection name</PanelHeader>
    <Subsection />
  </Panel>
);

Workflow.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Workflow;
