import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const Workflow = ({ id }) => (
	<Panel id={id}>
		<PanelHeader>Workflow</PanelHeader>
	</Panel>
);

Workflow.propTypes = {
	id: PropTypes.string.isRequired
};
export default Workflow;