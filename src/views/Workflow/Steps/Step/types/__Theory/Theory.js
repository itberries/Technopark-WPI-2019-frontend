import React from 'react';
import PropTypes from 'prop-types';

import { Group } from '@vkontakte/vkui';

import backendAPIService from '../../../../../../services/backend';

import SpinnerCentered from '../../../../../../common.blocks/SpinnerCentered/SpinnerCentered';
import Card from '../../__Card/Card';

import './Theory.scss';

class Theory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isLoading: false,
    };
  }

  async componentWillMount() {
    this.setState({
      isLoading: true,
    });
    const cards = await backendAPIService.getCards(this.props.id);
    this.setState({ cards, isLoading: false });
  }

  generateCards() {
    const cards = [];
    this.state.cards.forEach((card) => {
      cards.push(<Card note={card.note} image={card.image} />);
    });
    return cards;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Group className="theory__container">
        {isLoading ? <SpinnerCentered /> : this.generateCards()}
      </Group>
    );
  }
}

Theory.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Theory;
