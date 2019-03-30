import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Utils from '../../../utils/utils';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import './LearningMap.scss';

import { fetchSections } from '../../../actions/learningmap';

/**
 * LearningMap with sections and their subsections of learning workflow
 */
class LearningMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
  }

  async componentWillMount() {
    this.setState({
      fetching: true,
    });
    await this.props.fetchSections();
    this.setState({
      fetching: false,
    });
  }

  componentDidMount() {
    if (window.worfkflowScrollY === undefined) {
      window.worfkflowScrollY = document.getElementsByClassName('learningMap')[0].scrollHeight;
    }
    window.scrollTo(0, window.worfkflowScrollY);
  }

  componentWillUnmount() {
    window.worfkflowScrollY = window.scrollY;
  }

  /**
   * Generate learning map - the list of topics for study
   * @param {*} sections of learning map
   * @returns learning map
   * @memberof LearningMap
   */
  generateLearningMap() {
    const { sectionsById, rootSectionId } = this.props;
    if (typeof sectionsById === 'undefined' || sectionsById === null) {
      return [];
    }
    const learningMap = [];
    const generateProps = {
      position: 3,
      vector: 1,
      afterLast: false,
      isCompleted: true,
    };
    Utils.goThroughTheList(sectionsById, rootSectionId, (section) => {
      learningMap.unshift(
        <LearningMapSeparator name={section.name} isActive={!generateProps.afterLast} />,
      );
      if (section.parentId !== 0) {
        learningMap.unshift(
          <LearningMapRow>
            <LearningMapPoints
              position={generateProps.position}
              isActive={!generateProps.afterLast}
            />
          </LearningMapRow>,
        );
      }
      learningMap.unshift(this.generateSection(section, section.childId === 0, generateProps));
    });
    return learningMap;
  }

  /**
   * Generate learning map section
   * @param {Object} section of learning map
   * @param {Number} isLast section
   * @param {Object} generateProps
   * @memberof LearningMap
   */
  generateSection(section, isLast, generateProps) {
    const { userState } = this.props;

    const minCol = 1;
    const maxCol = 5;
    const sectionChain = [];

    Utils.goThroughTheList(section.subsectionsById, section.rootSubsectionId, (subsection) => {
      let start = 0;
      let end = 0;
      if (generateProps.vector === 1) {
        start = generateProps.position;
        end = generateProps.position + 1;
        if (start === maxCol) {
          start = maxCol - 1;
          end = maxCol;
        }
      } else {
        start = generateProps.position - 1;
        end = generateProps.position;
        if (end === minCol) {
          start = minCol;
          end = minCol + 1;
        }
      }
      // if (subsection.id === this.state.lastSubsectionId) {
      if (subsection.id === userState.subsectionId) {
        generateProps.isCompleted = false;
      }
      sectionChain.unshift(
        <LearningMapRow>
          <LearningMapSubsection
            id={subsection.id}
            name={subsection.name}
            start={start}
            end={end}
            isCompleted={generateProps.isCompleted}
            isCurrent={!(generateProps.afterLast || generateProps.isCompleted)}
            isActive={!generateProps.afterLast}
            onSelectSubsection={this.props.onSelectSubsection}
          />
        </LearningMapRow>,
      );
      if (!(generateProps.afterLast || generateProps.isCompleted)) {
        generateProps.afterLast = true;
      }
      if (generateProps.position === 1 || generateProps.position === 5) {
        generateProps.vector *= -1;
      }
      generateProps.position += generateProps.vector;
      if (!isLast) {
        sectionChain.unshift(
          <LearningMapRow>
            <LearningMapPoints
              position={generateProps.position}
              isActive={!generateProps.afterLast}
            />
          </LearningMapRow>,
        );
      }
    });
    return sectionChain;
  }

  /**
   * render
   * @return {ReactElement} Sections rows with their subsection buttons and separators
   */
  render() {
    const { fetching } = this.state;
    const { sectionsById } = this.props;
    return (
      <div className="learningMap">
        {fetching && <div>Loading...</div>}
        {sectionsById && <div className="learningMap__container">{this.generateLearningMap()}</div>}
      </div>
    );
  }
}

LearningMap.propTypes = {
  /* Description of prop "fetchSections". */
  fetchSections: PropTypes.func.isRequired,
  /* Description of prop "onSelectSubsection". */
  onSelectSubsection: PropTypes.func,
};

LearningMap.defaultProps = {
  onSelectSubsection: () => null,
};

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  const { sectionsById, rootSectionId } = state.learningMap;
  const userState = state.user.state;
  return {
    sectionsById,
    rootSectionId,
    userState,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchSections,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningMap);
