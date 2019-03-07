import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Epic, Tabbar, TabbarItem,
} from '@vkontakte/vkui';
import './Navigation.css';

const Navigation = ({ activePanel, panelsData, onPanelChange, fetchedUser }) => {

  let tabbarItems = [];
  let panels = [];
  console.log(panelsData);
  for (let i = 0; i < panelsData.length; i++) {
    tabbarItems.push(
      <TabbarItem
        onClick={onPanelChange}
        selected={activePanel === panelsData[i].name}
        data-story={panelsData[i].name}
        text={panelsData[i].text}
      >
        {(<img src={panelsData[i].icon} alt={panelsData[i].name + ' icon'} />)}
      </TabbarItem>
    );
    panels.push(
      <View id={panelsData[i].name} activePanel={panelsData[i].name}>
        {React.createElement(panelsData[i].tag, {id: panelsData[i].name, fetchedUser: fetchedUser})}
      </View>
    );
  }

  return (
    <Epic
      // eslint-disable-next-line react/destructuring-assignment
      activeStory={activePanel}
      tabbar={(
        <Tabbar>{tabbarItems}</Tabbar>
      )}
    >
      {panels}</Epic>
    );
}

Navigation.propTypes = {
    activePanel: PropTypes.string,
    panelsData: PropTypes.array.isRequired,
    onPanelChange: PropTypes.func,
    fetchedUser: PropTypes.shape({
      photo_200: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    })
 }
  
Navigation.defaultProps = {
  activePanel: PropTypes.string,
  activePanel: 'workflow',
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  })
};

export default Navigation