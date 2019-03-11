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
            <LearningMapPoints />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection text="pos1" start="1" end="2" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="2" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection text="pos2" start="2" end="3" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection text="pos3" start="3" end="4" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection text="pos4" start="4" end="5" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="5" />
          </LearningMapRow>
          <LearningMapSeparator text="Basic" />
        </div>
      </div>
    );
  }
}

export default LearningMap;
