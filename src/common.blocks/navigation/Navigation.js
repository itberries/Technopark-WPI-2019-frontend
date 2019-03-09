import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Epic, Tabbar, TabbarItem,
} from '@vkontakte/vkui';
import './Navigation.css';

const Navigation = ({
  activePanel, panelsData, onPanelChange, fetchedUser,
}) => {
  const tabbarItems = [];
  const panels = [];
  console.log(panelsData);

  panelsData.forEach((panelData) => {
    tabbarItems.push(
      <TabbarItem
        onClick={onPanelChange}
        selected={activePanel === panelData.name}
        data-story={panelData.name}
        text={panelData.text}
      >
        {<img src={panelData.icon} alt={`${panelData.name} icon`} />}
      </TabbarItem>,
    );
    panels.push(
      <View id={panelData.name} activePanel={panelData.name}>
        {React.createElement(panelData.tag, { id: panelData.name, fetchedUser })}
      </View>,
    );
  });

  return (
    <Epic
      // eslint-disable-next-line react/destructuring-assignment
      activeStory={activePanel}
      tabbar={<Tabbar>{tabbarItems}</Tabbar>}
    >
      {panels}
    </Epic>
  );
};

Navigation.propTypes = {
  activePanel: PropTypes.string,
  panelsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPanelChange: PropTypes.func,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

Navigation.defaultProps = {
  activePanel: 'workflow',
  onPanelChange: () => {},
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default Navigation;
