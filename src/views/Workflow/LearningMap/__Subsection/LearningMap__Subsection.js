import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from '@vkontakte/vkui';

import './LearningMap__Subsection.scss';
import MarkAsCompleted from '../../../../common.blocks/MarkAsCompleted/MarkAsCompleted';

import { selectSubsection } from '../../../../actions/subsection';

/**
 * LearningMap's block component with button
 */
class LearningMapSubsection extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * @type {object}
     * @property {string} id subsection id to send it to button onClick callback
     * @property {string} name subsection name, equal to button's text
     * @property {string} start button's start position on LearningMap
     * @property {string} end button's end postion on LearningMap
     * @property {bool} isActive is subsection active or not
     * @property {bool} isCurrent is subsection current learning block or not
     * @property {bool} isCompleted is learning of this subsection completed or not
     */
    this.state = {
      id: props.id,
      name: props.name,
      start: props.start,
      end: props.end,
      isActive: props.isActive,
      isCurrent: props.isCurrent,
      isCompleted: props.isCompleted,
    };
  }

  componentDidMount() {
    const { container } = this;
    let { start, end } = this.state;
    const wrapper = container.firstChild;
    if (wrapper.offsetWidth > container.offsetWidth) {
      const learningMapRightLimit = 5; // TODO: remove magic number
      end += Math.ceil(wrapper.offsetWidth / (container.offsetWidth / 2)) - 2;
      if (end > learningMapRightLimit) {
        const dif = end - start;
        start = learningMapRightLimit - dif;
        end = learningMapRightLimit;
      }
    }
    const mark = (container.offsetWidth / 2) * 0.8 * (end - start + 1);
    this.setState({ start, end, mark });
  }

  /**
   * render
   * @return {ReactElement} LearningMap's subsection block with button
   */
  render() {
    return (
      <div
        ref={el => (this.container = el)}
        className={`learningMap__col learningMap__col_start_${
          this.state.start
        } learningMap__col_end_${this.state.end}`}
      >
        <div className="LearningMap__Subsection_wrapper">
          <MarkAsCompleted
            isCompleted={this.state.isCompleted}
            className="LearningMap__Subsection_mark"
            margin={this.state.mark}
          />
          <Button
            className={`learningMap__button${
              this.state.isActive ? ' learningMap__button-active' : ''
            } ${this.state.isCurrent ? 'learningMap__button-current' : ''} ${
              this.state.isCompleted ? 'learningMap__button-completed' : ''
            }`}
            onClick={(e) => {
              if (this.state.isActive) {
                this.props.selectSubsection(this.state.id);
                this.props.onSelectSubsection('subsection', this.state.id, e);
                e.preventDefault();
                e.stopPropagation();
              }
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {this.state.name}
          </Button>
        </div>
      </div>
    );
  }
}

LearningMapSubsection.propTypes = {
  /* Description of prop "id". */
  id: PropTypes.number.isRequired,
  /* Description of prop "name". */
  name: PropTypes.string,
  /* Description of prop "start". */
  start: PropTypes.number,
  /* Description of prop "end". */
  end: PropTypes.number,
  /* Description of prop "isActive". */
  isActive: PropTypes.bool,
  /* Description of prop "isCurrent". */
  isCurrent: PropTypes.bool,
  /* Description of prop "isCompleted". */
  isCompleted: PropTypes.bool,
  /* Description of prop "onSelectSubsection". */
  onSelectSubsection: PropTypes.func,
  /* Description of prop "selectSubsection". */
  selectSubsection: PropTypes.func.isRequired,
};

LearningMapSubsection.defaultProps = {
  name: 'subsection',
  start: 1,
  end: 2,
  isActive: false,
  isCurrent: false,
  isCompleted: false,
  onSelectSubsection: () => null,
};

// export default LearningMapSubsection;

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    selectSubsection,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningMapSubsection);
