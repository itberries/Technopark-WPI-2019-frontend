import React from 'react';
import PropTypes from 'prop-types';
import { Div } from '@vkontakte/vkui';

import './Card.scss';

const Card = ({ note, image }) => {
  console.log('render card: ', note, image);
  console.log('image: ', image);
  if (
    image !== null
    && image !== undefined
    && image !== null
    && image !== 'undefined'
    && image !== ''
  ) {
    return (
      <Div className="card__container">
        <Div className="card__note">{note}</Div>
        <Div className="card__image">
          <img src={image} alt="Card icon" />
        </Div>
      </Div>
    );
  }
  return (
    <Div className="card__container">
      <Div className="card__note">{note}</Div>
    </Div>
  );
};

Card.propTypes = {
  note: PropTypes.string,
  image: PropTypes.string,
};

Card.defaultProps = {
  note: '',
  image: '',
};

export default Card;
