import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__points.css';

class LearnMapPoints extends React.Component {
  constructor(props) {
    super(props);
    const positionClass = props.position === '' ? '' : 'learnMap__col_pos_'.concat(props.position);
    const classNames = 'learnMap__col '.concat(positionClass, ' learnMap__points');
    this.state = {
      classes: classNames,
    };
  }

  render() {
    return (
      <div className={this.state.classes}>
        <div className="learnMap__point" />
        <div className="learnMap__point" />
        <div className="learnMap__point" />
      </div>
    );
  }
}

LearnMapPoints.propTypes = {
  position: PropTypes.string,
};

LearnMapPoints.defaultProps = {
  position: '',
};

export default LearnMapPoints;
