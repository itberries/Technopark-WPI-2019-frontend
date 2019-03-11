import React from 'react';
import PropTypes from 'prop-types';
import './LearningMap__Points.scss';

/**
 * LearningMap's block component with path points
 */
class LearningMapPoints extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * @type {object}
     * @property {string} position block's position on map
     * @property {bool} isActive is active or not
     */
    this.state = {
      position: `learningMap__col_pos_${props.position}`,
      isActive: props.isActive,
    };
  }

  /**
   * render
   * @return {ReactElement} point's block
   */
  render() {
    const points = [];
    for (let i = 0; i < 3; i++) {
      points.push(
        <div
          className={`learningMap__point learningMap__point-${
            this.state.isActive ? 'active' : 'unactive'
          }`}
        />,
      );
    }
    return (
      <div className={`learningMap__col ${this.state.position} learningMap__points`}>{points}</div>
    );
  }
}

LearningMapPoints.propTypes = {
  /* Description of prop "position". */
  position: PropTypes.string,
  /* Description of prop "isActive". */
  isActive: PropTypes.bool,
};

LearningMapPoints.defaultProps = {
  position: '',
  isActive: false,
};

export default LearningMapPoints;
