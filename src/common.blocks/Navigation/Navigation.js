import React from 'react';
import PropTypes from 'prop-types';
import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import './Navigation.scss';

const Navigation = ({
  activeView, viewsData, onViewChange, user,
}) => {
  const tabbarItems = [];
  const views = [];

  viewsData.forEach((viewData) => {
    tabbarItems.push(
      <TabbarItem
        key={viewData.name}
        onClick={onViewChange}
        selected={activeView === viewData.name}
        data-story={viewData.name}
        text={viewData.text}
      >
        {<img src={viewData.icon} alt={`${viewData.name} icon`} />}
      </TabbarItem>,
    );
    views.push(React.createElement(viewData.view, { viewData, user }));
  });

  return (
    <Epic activeStory={activeView} tabbar={<Tabbar>{tabbarItems}</Tabbar>}>
      {views}
    </Epic>
  );
};

Navigation.propTypes = {
  activeView: PropTypes.string,
  viewsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onViewChange: PropTypes.func,
  user: PropTypes.shape({
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number,
  }),
};

Navigation.defaultProps = {
  activeView: 'workflow',
  onViewChange: () => null,
  user: PropTypes.shape({
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number,
  }),
};

export default Navigation;
