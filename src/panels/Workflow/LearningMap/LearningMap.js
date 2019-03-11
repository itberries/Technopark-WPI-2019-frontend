import React from 'react';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import './LearningMap.scss';

class LearningMap extends React.Component {
  componentDidMount() {
    if (window.worfkflowScrollY === undefined) {
      window.worfkflowScrollY = document.getElementsByClassName('learningMap')[0].scrollHeight;
    }
    window.scrollTo(0, window.worfkflowScrollY);
  }

  componentWillUnmount() {
    window.worfkflowScrollY = window.scrollY;
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
          <LearningMapSeparator text="Intermediate" />
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
            <LearningMapSubsection
              name="File system"
              start="4"
              end="5"
              isActive="true"
              isCurrent="true"
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" isActive="true" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection name="Numeric system" start="3" end="4" isActive="true" />
          </LearningMapRow>
          <LearningMapSeparator text="Basic" />
        </div>
      </div>
    );
  }
}

export default LearningMap;
