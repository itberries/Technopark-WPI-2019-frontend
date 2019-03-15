import React from 'react';
import PropTypes from 'prop-types';
import {
  PanelHeader, HeaderButton, IOS, osname,
} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previousPanel: props.previousPanel,
    };
  }

  render() {
    return (
      <PanelHeader
        left={(
          <HeaderButton
            onClick={(e) => {
              this.props.onBackClick(this.state.previousPanel, e);
            }}
          >
            {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </HeaderButton>
)}
        addon={(
          <HeaderButton
            onClick={(e) => {
              this.props.onBackClick(this.state.previousPanel, e);
            }}
          >
            Назад
          </HeaderButton>
)}
      >
        {this.props.text}
      </PanelHeader>
    );
  }
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
  previousPanel: PropTypes.string.isRequired,
};

export default Header;
