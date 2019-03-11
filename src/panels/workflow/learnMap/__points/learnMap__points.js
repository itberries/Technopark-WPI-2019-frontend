import React from 'react';
import PropTypes from 'prop-types';
import './learnMap__points.css';

/**
 * LearnMap's block component with path points
 */
class LearnMapPoints extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * constructor
     * @param {string} position block's position on map
     */
    const positionClass = props.position === '' ? '' : `learnMap__col_pos_${props.position}`;
    this.state = {
      position: positionClass,
    };
  }

  /**
   * render
   * @return {ReactElement} point's block
   */
  render() {
    const points = [];
    for (let i = 0; i < 3; i++) {
      points.push(<div className="learnMap__point" />);
    }
    return <div className={`learnMap__col ${this.state.position} learnMap__points`}>{points}</div>;
  }
}

LearnMapPoints.propTypes = {
  /* Description of prop "position". */
  position: PropTypes.number,
};

LearnMapPoints.defaultProps = {
  position: '',
};

export default LearnMapPoints;
