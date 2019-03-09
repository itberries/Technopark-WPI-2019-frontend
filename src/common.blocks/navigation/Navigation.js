import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Epic, Tabbar, TabbarItem,
} from '@vkontakte/vkui';
import './Navigation.css';

const Navigation = ({
  activePanel, panelsData, onPanelChange, user,
}) => {
  const tabbarItems = [];
  const panels = [];

  panelsData.forEach((panelData) => {
    tabbarItems.push(
      <TabbarItem
        key={panelData.name}
        onClick={onPanelChange}
        selected={activePanel === panelData.name}
        data-story={panelData.name}
        text={panelData.text}
      >
        {<img src={panelData.icon} alt={`${panelData.name} icon`} />}
      </TabbarItem>,
    );
    panels.push(
      <View key={panelData.name} id={panelData.name} activePanel={panelData.name}>
        {React.createElement(panelData.tag, { id: panelData.name, user })}
      </View>,
    );
  });

  return (
    <Epic activeStory={activePanel} tabbar={<Tabbar>{tabbarItems}</Tabbar>}>
      {panels}
    </Epic>
  );
};

Navigation.propTypes = {
  activePanel: PropTypes.string,
  panelsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPanelChange: PropTypes.func,
  user: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

Navigation.defaultProps = {
  activePanel: 'workflow',
  onPanelChange: () => {},
  user: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default Navigation;
