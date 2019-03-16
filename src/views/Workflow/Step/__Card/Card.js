import React from 'react';

import { Div } from '@vkontakte/vkui';

import './Card.scss';

const Card = () => (
  <Div className="card__container">
    <Div className="card__note">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, optio mollitia repellendus
      officiis est odio quia adipisci eum facere consequuntur odit laborum animi itaque, sapiente
      asperiores quibusdam enim? Numquam, nemo?
    </Div>
    <Div className="card__image">
      <img src="https://pp.userapi.com/c850124/v850124866/c28df/W98Le2Vc10I.jpg" alt="Card icon" />
    </Div>
  </Div>
);

export default Card;
