import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Group, Header, Div, Button, Link,
} from '@vkontakte/vkui';

import SpinnerCentered from '../../../common.blocks/SpinnerCentered/SpinnerCentered';

import './Event.scss';

import { fetchEventById } from '../../../actions/events';

const mapStateToProps = (state) => {
  const { selectedEventDetail } = state.events;
  return {
    selectedEventDetail,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchEventById,
  },
  dispatch,
);

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentWillMount() {
    this.setState({
      isLoading: true,
    });
    await this.props.fetchEventById(this.props.id);
    this.setState({
      isLoading: false,
    });
  }

  render() {
    console.log('Event render state, props: ', this.state, this.props);
    return this.state.isLoading ? (
      <SpinnerCentered />
    ) : (
      <Group className="event">
        <Header>{this.props.selectedEventDetail.title}</Header>
        <img
          className="event__image"
          src={this.props.selectedEventDetail.imageUrl}
          alt={this.props.selectedEventDetail.title}
        />
        <Div
          className="event__description"
          dangerouslySetInnerHTML={{ __html: this.props.selectedEventDetail.description }}
        />
        <Link href={this.props.selectedEventDetail.detailsUrl} target="_blank">
          <Button className="event__btn">Подробнее</Button>
        </Link>
      </Group>
    );
  }
}

Event.propTypes = {};

Event.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);
