import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Group } from '@vkontakte/vkui';

import Card from '../../__Card/Card';

class Theory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      cards: [
        {
          note: 'first text',
          image: 'https://qph.fs.quoracdn.net/main-qimg-dfe0ecd5d2d70c2dc7275f345126e4d1',
        },
        {
          note: 'second text',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yCkGFKFqt28SUjph1T7ewQ63deV8bH8CRldayxr2-qJH8een',
        },
      ],
    };
  }

  getCards() {
    axios
      .get(`/steps/${this.state.id}/cards/`)
      .then((response) => {
        const cards = response.data;
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
