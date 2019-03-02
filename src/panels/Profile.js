import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

const Profile = ({ id, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Profile</PanelHeader>
		{fetchedUser &&
		<Group title="User Data">
            <Cell
                before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                size="l"
            >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </Cell>
        </Group>}
	</Panel>
);

Profile.propTypes = {
	id: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};
export default Profile;