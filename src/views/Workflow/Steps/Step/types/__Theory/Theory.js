import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Group } from '@vkontakte/vkui';

import Card from '../../__Card/Card';

class Theory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    console.log('Cards getCards id:', this.props.id);
    axios
      .get(`/steps/${this.props.id}/cards`)
      .then((response) => {
        const cards = response.data;
        console.log('getCards response:', response);
        this.setState({ cards });
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          console.error('getSteps not found!!!', error.response);
        } else {
          console.error('getSteps error!!!', error.response);
        }
      });
  }

  generateCards() {
    const cards = [];
    this.state.cards.forEach((card) => {
      cards.push(<Card note={card.note} image={card.image} />);
    });
    console.log('Cards generated: ', cards);
    console.log('Cards from state: ', this.state.cards);
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
