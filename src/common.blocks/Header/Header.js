import React from 'react';
import PropTypes from 'prop-types';
import {
  PanelHeader, HeaderButton, IOS, osname,
} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

import './Header.scss';

const Header = ({ text, onBackClick }) => (
  <PanelHeader
    left={(
      <HeaderButton
        className="header_button"
        onClick={(e) => {
          onBackClick(e);
        }}
      >
        {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
      </HeaderButton>
)}
    addon={(
      <HeaderButton
        className="header_button"
        onClick={(e) => {
          onBackClick(e);
        }}
      >
        Назад
      </HeaderButton>
)}
  >
    {text}
  </PanelHeader>
);

Header.propTypes = {
  text: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default Header;
