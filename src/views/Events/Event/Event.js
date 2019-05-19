import React from 'react';
import PropTypes from 'prop-types';

import {
  Group, Header, Div, Button,
} from '@vkontakte/vkui';

import './Event.scss';

const Event = ({ eventId }) => (
  <>
    <Group className="event">
      <Header>
        Событие
        {eventId}
      </Header>
      <img
        className="event__image"
        src="https://corp.imgsmail.ru/media/images/ekskjuptpyy_uYura7f.jpg.640x400_q95_box-96,0,1827,1080_crop_detail.jpg"
        alt="Mail.Ru Group"
      />
      <Div className="event__description">
        Приходите узнать, как работает крупнейшая компания рунета, и как офисная среда помогает нам
        создавать креативные идеи!
        <br />
        <br />
        Наш мир – это такие проекты как Одноклассники, ВКонтакте, Почта Mail.Ru, Delivery Club,
        MAPS.ME, игры и многие другие. Мы с радостью расскажем о них, проведем вас по нашей башне,
        удивим ее захватывающими видами и покажем невероятный и будоражащий мир IT!
        <br />
        <br />
        Вам точно будет интересно, если вы:
        <br />
        <br />
        * старше 14 лет;
        <br />
        <br />
        * серьезно увлечены сферой IT / уже работаете в IT;
        <br />
        <br />
        * ищете вдохновения для стартапа;
        <br />
        <br />
* хотите прикоснуться к миру IT, чтобы открыть для себя что-то новое.
      </Div>
      <Button className="event__btn">Подробнее</Button>
    </Group>
  </>
);

Event.propTypes = {};

Event.defaultProps = {};

export default Event;
