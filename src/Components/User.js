import React from 'react';
import PropTypes from 'prop-types';
import { Group, Avatar, Cell } from '@vkontakte/vkui';
import profileIcon from "../img/icons/profile.svg";
import "./User.scss"

const User = ({fetchedUser }) => (
    <Group title = "User Data" className = "profile">
        {fetchedUser ? (
        <div
            before = {fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
            size =" l"
            className = "container"
        >
            <div className = "user_avatar" size =" l" align="center">
                {fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
            </div>
            <div className = "user_name">
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </div>
            <div className = "user_score_title">
                Score:
            </div>
            <div className = "user_score_value">
                100
            </div>
            <div className = "user_level_title">
                Level:
            </div>
            <div className = "user_level_value">
                Basic
            </div>
        </div>
        ) : (
        <div
            before = {<img src={profileIcon} alt="profile icon" />}
            size = "s"
            className = "container"
        >
            <div className = "user_avatar" size =" l">
                <img src={profileIcon} alt="profile icon"/>
            </div>
            <div className = "user_name">
                No user data
            </div>
            <div className = "user_score_title">
                Score:
            </div>
            <div className = "user_score_value">
                100
            </div>
            <div className = "user_level_title">
                Level:
            </div>
            <div className = "user_level_value">
                Basic
            </div>
        </div>
        )}
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