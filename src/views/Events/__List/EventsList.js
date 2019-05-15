import React from 'react';
import PropTypes from 'prop-types';

import {
  Group, Div, Tabs, HorizontalScroll, TabsItem, List, Cell, Avatar,
} from '@vkontakte/vkui';

const EventsList = ({ activeTab, onSelectTab, onSelectEvent }) => (
  <Div>
    <Group>
      <Tabs type="buttons">
        <HorizontalScroll>
          <TabsItem onClick={() => onSelectTab('all')} selected={activeTab === 'all'}>
            Все
          </TabsItem>
          <TabsItem onClick={() => onSelectTab('soon')} selected={activeTab === 'soon'}>
            Ближайшие
          </TabsItem>
        </HorizontalScroll>
      </Tabs>
      <List>
        <Cell
          description="21 июня 2019 в 09:00, Москва"
          before={(
            <Avatar
              src="https://files.startupranking.com/startup/thumb/46467_60b7bdd08d1b5ae1e87f4dc39e96a8c91653e1e7_mail-ru-group_m.png"
              size={80}
            />
)}
          size="l"
          multiline
          expandable
          onClick={(e) => {
            console.log(onSelectEvent);
            onSelectEvent('event', 1, e);
          }}
        >
          Открытая экскурсия в Mail.Ru Group
        </Cell>
        <Cell
          description="7 июня 2019 в 09:00, Москва"
          before={(
            <Avatar
              src="https://files.startupranking.com/startup/thumb/46467_60b7bdd08d1b5ae1e87f4dc39e96a8c91653e1e7_mail-ru-group_m.png"
              size={80}
            />
)}
          size="l"
          multiline
          expandable
          onClick={(e) => {
            onSelectEvent('event', 2, e);
          }}
        >
          Открытая экскурсия в Mail.Ru Group
        </Cell>
        <Cell
          description="лето 2019, Москва"
          before={(
            <Avatar
              src="https://static.tildacdn.com/tild3661-3932-4565-b765-616332623730/Codabra_Logo_Codabr.png"
              size={80}
            />
)}
          size="l"
          multiline
          expandable
          onClick={(e) => {
            onSelectEvent('event', 3, e);
          }}
        >
          Лагерь цифровых профессий Кодабра
        </Cell>
      </List>
    </Group>
  </Div>
);

EventsList.propTypes = {};

EventsList.defaultProps = {};

export default EventsList;
