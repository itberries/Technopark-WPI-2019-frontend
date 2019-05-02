import React from 'react';

import './__Progress.scss';

class Progress extends React.Component {
  render() {
    const cells = [];
    const cellsNumber = 9;
    for (const x of Array(cellsNumber).keys()) {
      cells.push(<div className="Map__cell" />);
    }
    cells[0] = (
      <div className="Map__cell rocket" style={{ backgroundColor: this.props.roadColor }} />
    );
    cells[1] = (
      <div className="Map__cell rocket">
        <img src={this.props.playerIcon} alt="rocket1 icon" />
      </div>
    );
    return (
      <div className="Progress__container">
        <div className="Progress__header">{this.props.header}</div>
        <div className="Progress__Map">{cells}</div>
      </div>
    );
  }
}

export default Progress;
