import React from 'react';
import PropTypes from 'prop-types';

import {
  Group, Div, Tabs, HorizontalScroll, TabsItem, List, Cell, Avatar,
} from '@vkontakte/vkui';

class EventsList extends React.Component {
  generateListItems() {
    const { events, onSelectEvent } = this.props;
    console.log('EVENTS_LIST generate props:', this.props);

    let resultItems = [];
    if (typeof events !== 'undefined') {
      resultItems = events.reduce((items, event) => {
        console.log('EVENTS_LIST generate items, event:', items, event);
        items.push(
          <Cell
            description={`${event.date}, ${event.city}`}
            before={<Avatar src={event.previewUrl} size={80} />}
            size="l"
            multiline
            expandable
            onClick={(e) => {
              console.log(onSelectEvent);
              onSelectEvent(event.id, e);
            }}
          >
            {event.title}
          </Cell>,
        );
        return items;
      }, resultItems);
    }
    console.log('EVENTS_LIST generate before return items: ', resultItems);
    return resultItems;
  }

  render() {
    console.log('EVENTS_LIST props:', this.props);
    const { activeTab, onSelectTab } = this.props;
    const eventsItemsList = this.generateListItems();
    console.log('EVENTS_LIST items:', eventsItemsList);
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
          <List>{eventsItemsList}</List>
        </Group>
      </Div>
    );
  }
}

EventsList.propTypes = {};

EventsList.defaultProps = {};

export default EventsList;
