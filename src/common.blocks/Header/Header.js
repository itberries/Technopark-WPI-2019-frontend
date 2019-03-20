import React from 'react';
import PropTypes from 'prop-types';
import {
  PanelHeader, HeaderButton, IOS, osname,
} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const Header = ({ text, onBackClick }) => (
  <PanelHeader
    left={(
      <HeaderButton
        onClick={(e) => {
          onBackClick(e);
        }}
      >
        {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
      </HeaderButton>
)}
    addon={(
      <HeaderButton
        onClick={(e) => {
          onBackClick(e);
        }}
      >
        Back
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
