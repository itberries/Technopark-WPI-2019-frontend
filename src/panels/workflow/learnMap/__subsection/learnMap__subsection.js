import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__subsection.css';

import { Button } from '@vkontakte/vkui';

class LearnMapSubsection extends React.Component {
  constructor(props) {
    super(props);
    const startPosClass = props.start === '' ? '' : 'learnMap__col_start_'.concat(props.start);
    const endPosClass = props.end === '' ? '' : 'learnMap__col_end_'.concat(props.end);
    const classNames = 'learnMap__col '.concat(startPosClass, ' ', endPosClass);
    this.state = {
      text: props.text,
      classes: classNames,
    };
  }

  render() {
    return (
      <div className={this.state.classes}>
        <Button className="learnMap__buttom">{this.state.text}</Button>
      </div>
    );
  }
}

LearnMapSubsection.propTypes = {
  text: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
};

LearnMapSubsection.defaultProps = {
  text: 'subsection',
  start: '1',
  end: '2',
};

export default LearnMapSubsection;
