import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import Utils from '../../../utils/utils';

import './LearningMap.scss';

/**
 * LearningMap with sections and their subsections of learning workflow
 */
class LearningMap extends React.Component {
  constructor(props) {
    super(props);
    const state = this.props.data.get('learningMap');
    if (state !== undefined) {
      this.state = state;
    } else {
      this.state = {
        sections: null,
        rootId: 0,
      };
      this.getSections();
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
        this.props.data.set('learningMap', this.state);
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
    console.log('learning map sections', sections);
    if (sections === null) {
      return [];
    }
    console.log('generrate learning map');
    const learningMap = [];
    const generateProps = {
      position: 3,
      vector: 1,
      afterLast: false,
    };
    Utils.goThroughTheList(sections, this.state.rootId, (section) => {
      learningMap.unshift(
        <LearningMapSeparator name={section.name} isActive={!generateProps.afterLast} />,
      );
      console.log('section: ', section);
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
    console.log('section: ', section);
    const minCol = 1;
    const maxCol = 5;
    const sectionChain = [];

    Utils.goThroughTheList(section.subsections, section.rootId, (subsection) => {
      console.log('section.subsections: ', section.subsections);
      console.log('rootId: ', section.rootId);
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
      sectionChain.unshift(
        <LearningMapRow>
          <LearningMapSubsection
            id={subsection.id}
            name={subsection.name}
            start={start}
            end={end}
            isCompleted={subsection.isCompleted}
            isCurrent={!(generateProps.afterLast || subsection.isCompleted)}
            isActive={!generateProps.afterLast}
            onSelectSubsection={this.props.onSelectSubsection}
          />
        </LearningMapRow>,
      );
      if (!(generateProps.afterLast || subsection.isCompleted)) {
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
