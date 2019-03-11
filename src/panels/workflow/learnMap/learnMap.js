import React from 'react';

import LearnMapRow from './__row/learnMap__row';
import LearnMapSeparator from './__separator/learnMap__separator';
import LearnMapPoints from './__points/learnMap__points';
import LearnMapSubsection from './__subsection/learnMap__subsection';

import './learnMap.css';

class LearnMap extends React.Component {
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

export default LearnMap;
