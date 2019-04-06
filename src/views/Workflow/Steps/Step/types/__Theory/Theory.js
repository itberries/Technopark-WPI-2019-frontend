import React from 'react';
import PropTypes from 'prop-types';

import { Group } from '@vkontakte/vkui';

import backendAPIService from '../../../../../../services/backend';

import Card from '../../__Card/Card';

class Theory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  async componentDidMount() {
    const cards = await backendAPIService.getCards(this.props.id);
    this.setState({ cards });
  }

  generateCards() {
    const cards = [];
    this.state.cards.forEach((card) => {
      cards.push(<Card note={card.note} image={card.image} />);
    });
    return cards;
  }

  render() {
    return <Group>{this.generateCards()}</Group>;
  }
}

Theory.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Theory;
