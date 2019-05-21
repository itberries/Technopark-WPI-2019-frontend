import React from 'react';
import PropTypes from 'prop-types';

import {
  Group, Div, Tabs, HorizontalScroll, TabsItem, List, Cell, Avatar,
} from '@vkontakte/vkui';

class EventsList extends React.Component {
  generateListItems() {
    const { events, onSelectEvent } = this.props;

    let resultItems = [];
    if (typeof events !== 'undefined') {
      resultItems = events.reduce((items, event) => {
        items.push(
          <Cell
            description={`${event.date}, ${event.city}`}
            before={<Avatar src={event.previewUrl} size={80} />}
            size="l"
            multiline
            expandable
            onClick={(e) => {
              onSelectEvent(event.id, e);
            }}
          >
            {event.title}
          </Cell>,
        );
        return items;
      }, resultItems);
    }
    return resultItems;
  }

  render() {
    const { activeTab, onSelectTab } = this.props;
    const eventsItemsList = this.generateListItems();
    return (
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
          {activeTab === 'all' ? (
            <List>{eventsItemsList}</List>
          ) : (
            <Div style={{ color: 'gray' }}>Скоро появится в IT-галактике...</Div>
          )}
        </Group>
      </Div>
    );
  }
}

EventsList.propTypes = {};

EventsList.defaultProps = {};

export default EventsList;
