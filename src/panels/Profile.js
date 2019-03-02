import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

import User from "../Components/User";

const Profile = ({ id, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Profile</PanelHeader>
		<User fetchedUser={this.state.fetchedUser}/>
	</Panel>
);

Profile.propTypes = {
	id: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),
};
export default Profile;