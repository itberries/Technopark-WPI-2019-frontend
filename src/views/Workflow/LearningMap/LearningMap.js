import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import './LearningMap.scss';

/**
 * LearningMap block with sections and their subsections of learning workflow
 */
class LearningMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
  }

  componentDidMount() {
    if (window.worfkflowScrollY === undefined) {
      window.worfkflowScrollY = document.getElementsByClassName('learningMap')[0].scrollHeight;
    }
    window.scrollTo(0, window.worfkflowScrollY);
    this.getSections();
  }

  componentWillUnmount() {
    window.worfkflowScrollY = window.scrollY;
  }

  getSections() {
    let { sections } = this.state;
    axios
      .get('/sections/')
      .then((response) => {
        sections = response.data;
        this.setState({ sections });
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
  generateLearnMap() {
    const learningMap = [];
    const generateProps = {
      position: 3,
      vector: 1,
      afterLast: false,
    };

    this.state.sections.forEach((section, i) => {
      learningMap.unshift(
        <LearningMapSeparator name={section.name} isActive={!generateProps.afterLast} />,
      );
      if (i !== 0) {
        learningMap.unshift(
          <LearningMapRow>
            <LearningMapPoints
              position={generateProps.position}
              isActive={!generateProps.afterLast}
            />
          </LearningMapRow>,
        );
      }
      learningMap.unshift(
        this.generateSection(section, i !== this.state.sections.length - 1, generateProps),
      );
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

    section.subsections.forEach((subsection, j) => {
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
      if (isLast || j !== section.subsections.length - 1) {
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
    console.log('render learningmap, sections: ', this.state.sections);
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
};

LearningMap.defaultProps = {
  onSelectSubsection: () => null,
};

export default LearningMap;
