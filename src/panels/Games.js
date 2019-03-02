import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const Games = ({ id }) => (
	<Panel id={id}>
		<PanelHeader>Games</PanelHeader>
	</Panel>
);

Games.propTypes = {
	id: PropTypes.string.isRequired
};
export default Games;