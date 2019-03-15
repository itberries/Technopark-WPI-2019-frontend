import React from 'react';
import PropTypes from 'prop-types';

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
      sections: [
        {
          name: 'Basic',
          subsections: [
            {
              id: 1,
              name: 'Numeric system',
            },
            {
              id: 2,
              name: 'File system',
            },
            {
              id: 3,
              name: 'Internet and URLs',
            },
          ],
        },
        {
          name: 'Intermediate',
          subsections: [
            {
              id: 4,
              name: 'Algebra of logic',
            },
            {
              id: 5,
              name: 'Programming',
            },
          ],
        },
      ],
    };
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
  generateLearnMap(sections) {
    const learningMap = [];
    const generateProps = {
      position: 3,
      vector: 1,
    };

    sections.forEach((section, i) => {
      learningMap.unshift(<LearningMapSeparator name={section.name} isActive />);
      if (i !== 0) {
        learningMap.unshift(
          <LearningMapRow>
            <LearningMapPoints position={generateProps.position} isActive />
          </LearningMapRow>,
        );
      }
      learningMap.unshift(this.generateSection(section, i !== sections.length - 1, generateProps));
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
            isActive
            isCompleted
            onSelectSubsection={this.props.onSelectSubsection}
          />
        </LearningMapRow>,
      );
      if (generateProps.position === 1 || generateProps.position === 5) {
        generateProps.vector *= -1;
      }
      generateProps.position += generateProps.vector;
      if (isLast || j !== section.subsections.length - 1) {
        sectionChain.unshift(
          <LearningMapRow>
            <LearningMapPoints position={generateProps.position} isActive />
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
        <div className="learningMap__container">
          <LearningMapRow>
            <LearningMapSubsection
              id="4"
              name="Programming"
              start="1"
              end="2"
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="2" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="3"
              name="Algebra of logic"
              start="2"
              end="3"
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapSeparator name="Intermediate" />
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="2"
              name="Internet and URLs"
              start="3"
              end="4"
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="1"
              name="File system"
              start="4"
              end="5"
              isActive
              isCurrent
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" isActive />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="0"
              name="Numeric system"
              start="3"
              end="4"
              isActive
              isCompleted
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapSeparator name="Basic" isActive />
        </div>
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
