import React from 'react';

import './__FinishLine.scss';

class FinishLine extends React.Component {
  render() {
    const finish = [];
    const cubesNumber = 10;
    for (const x of Array(cubesNumber).keys()) {
      if (x % 2 === 0) {
        finish.push(
          <div className="finishLine__cube-white" />,
          <div className="finishLine__cube-black" />,
        );
      } else {
        finish.push(
          <div className="finishLine__cube-black" />,
          <div className="finishLine__cube-white" />,
        );
      }
    }
    return <div className="finishLine">{finish}</div>;
  }
}

export default FinishLine;
