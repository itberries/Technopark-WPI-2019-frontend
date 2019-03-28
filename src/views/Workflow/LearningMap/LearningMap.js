import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import * as Utils from '../../../utils/utils';

import './LearningMap.scss';

/**
 * LearningMap with sections and their subsections of learning workflow
 */
class LearningMap extends React.Component {
  constructor(props) {
    super(props);
    const state = window.learningMap;
    if (state !== undefined) {
      console.log('state is undefined');
      this.state = state;
    } else {
      console.log('state is not undefined');
      this.state = {
        sections: null,
        rootId: 1,
        lastSectionId: 1,
        lastSubsectionId: 1,
      };
      this.getSections();
    }
  }

  componentWillMount() {
    if (this.props.data.get('section_done')) {
      this.setState((prevState) => {
        let section = prevState.sections.get(prevState.lastSectionId);
        console.log('section: ', section);
        let subsection = section.subsections.get(prevState.lastSubsectionId);
        console.log('subsection: ', subsection);
        if (subsection.childId !== 0) {
          subsection = section.subsections.get(subsection.childId);
        } else if (section.childId !== 0) {
          section = prevState.sections.get(section.childId);
          subsection = section.rootId;
        }
        console.log('section_done: ', section, subsection);
        const state = window.learningMap;
        state.lastSectionId = subsection.id;
        state.lastSectionId = section.id;
        window.learningMap = state;
        return { lastSectionId: section.id, lastSubsectionId: subsection.id };
      });
    }
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
   * Get all sections with their subsections from API
   * @memberof Subsection
   */
  getSections() {
    axios
      .get('/sections/')
      .then((response) => {
        const result = response.data;
        const sections = Utils.makeMapFromArray(result);
        Utils.goThroughTheList(sections.map, sections.rootId, (section) => {
          const subsectionsMap = Utils.makeMapFromArray(section.subsections);
          section.subsections = subsectionsMap.map;
          section.rootId = subsectionsMap.rootId;
        });
        this.setState({ sections: sections.map, rootId: sections.rootId });
        window.learningMap = this.state;
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          console.error('getSections not found!!!', error.response);
        } else {
          console.error('getSections error!!!', error.response);
        }
      });
  }

  /**
   * Generate learning map - the list of topics for study
   * @param {*} sections of learning map
   * @returns learning map
   * @memberof LearningMap
   */
  generateLearnMap(sections) {
    if (sections === null) {
      return [];
    }
    const learningMap = [];
    const generateProps = {
      position: 3,
      vector: 1,
      afterLast: false,
      isCompleted: true,
    };
    Utils.goThroughTheList(sections, this.state.rootId, (section) => {
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
    const minCol = 1;
    const maxCol = 5;
    const sectionChain = [];

    Utils.goThroughTheList(section.subsections, section.rootId, (subsection) => {
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
      if (subsection.id === this.state.lastSubsectionId) {
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
    return (
      <div className="learningMap">
        <div className="learningMap__container">{this.generateLearnMap(this.state.sections)}</div>
      </div>
    );
  }
}

LearningMap.propTypes = {
  /* Description of prop "onSelectSubsection". */
  onSelectSubsection: PropTypes.func,
  data: PropTypes.instanceOf(Map).isRequired,
};

LearningMap.defaultProps = {
  onSelectSubsection: () => null,
};

export default LearningMap;
