import React from 'react';
import PropTypes from 'prop-types';
import { Group, Avatar, Cell } from '@vkontakte/vkui';

const User = ({fetchedUser }) => (
    fetchedUser &&
    <Group title="User Data">
        <Cell
            before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
            size="l"
        >
        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </Cell>
    </Group>
)

User.propTypes = {
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),
};
export default User;