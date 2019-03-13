import React from 'react';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import './LearningMap.scss';

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

  generateLearnMap(sections) {
    const learningMap = [];
    let position = 3;
    let vector = 1;
    const minCol = 1;
    const maxCol = 5;

    sections.forEach((section, i) => {
      learningMap.unshift(<LearningMapSeparator name={section.name} isActive />);
      if (i !== 0) {
        learningMap.unshift(
          <LearningMapRow>
            <LearningMapPoints position={position} isActive />
          </LearningMapRow>,
        );
      }
      section.subsections.forEach((subsection, j) => {
        let start = 0;
        let end = 0;
        if (vector === 1) {
          start = position;
          end = position + 1;
          if (start === maxCol) {
            start = maxCol - 1;
            end = maxCol;
          }
        } else {
          start = position - 1;
          end = position;
          if (end === minCol) {
            start = minCol;
            end = minCol + 1;
          }
        }
        learningMap.unshift(
          <LearningMapRow>
            <LearningMapSubsection
              name={subsection.name}
              start={start}
              end={end}
              isActive
              isCompleted
            />
          </LearningMapRow>,
        );
        if (position === 1 || position === 5) {
          vector *= -1;
        }
        position += vector;
        if (i !== sections.length - 1 || j !== section.subsections.length - 1) {
          learningMap.unshift(
            <LearningMapRow>
              <LearningMapPoints position={position} isActive />
            </LearningMapRow>,
          );
        }
      });
    });
    return learningMap;
  }

  render() {
    return (
      <div className="learningMap">
        <div className="learningMap__container">
          <LearningMapRow>
            <LearningMapSubsection name="Programming" start="1" end="2" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="2" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection name="Algebra of logic" start="2" end="3" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapSeparator name="Intermediate" />
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection name="Internet and URLs" start="3" end="4" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection name="File system" start="4" end="5" isActive isCurrent />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" isActive />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection name="Numeric system" start="3" end="4" isActive isCompleted />
          </LearningMapRow>
          <LearningMapSeparator name="Basic" isActive />
        </div>
        <div className="learningMap__container">{this.generateLearnMap(this.state.sections)}</div>
      </div>
    );
  }
}

export default LearningMap;
