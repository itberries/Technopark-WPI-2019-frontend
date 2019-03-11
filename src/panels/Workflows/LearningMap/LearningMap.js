import React from 'react';

import LearnMapRow from './__Row/LearningMap__Row';
import LearnMapSeparator from './__Separator/LearningMap__Separator';
import LearnMapPoints from './__Points/LearningMap__Points';
import LearnMapSubsection from './__Subsection/LearningMap__Subsection';

import './LearningMap.scss';

class LearningMap extends React.Component {
  componentDidMount() {
    if (window.worfkflowScrollY === undefined) {
      window.worfkflowScrollY = document.getElementsByClassName('learnMap')[0].scrollHeight;
    }
    window.scrollTo(0, window.worfkflowScrollY);
  }

  componentWillUnmount() {
    window.worfkflowScrollY = window.scrollY;
  }

  render() {
    return (
      <div className="learnMap">
        <div className="learnMap__container">
          <LearnMapRow>
            <LearnMapPoints />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapSubsection text="pos1" start="1" end="2" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapPoints position="2" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapSubsection text="pos2" start="2" end="3" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapPoints position="3" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapSubsection text="pos3" start="3" end="4" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapPoints position="4" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapSubsection text="pos4" start="4" end="5" />
          </LearnMapRow>
          <LearnMapRow>
            <LearnMapPoints position="5" />
          </LearnMapRow>
          <LearnMapSeparator text="Basic" />
        </div>
      </div>
    );
  }
}

export default LearningMap;
