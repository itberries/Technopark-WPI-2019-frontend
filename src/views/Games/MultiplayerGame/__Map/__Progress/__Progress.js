import React from 'react';

import './__Progress.scss';

class Progress extends React.Component {
  render() {
    const cells = [];
    const cellsNumber = 3;
    const doneCells = this.props.position < cellsNumber ? this.props.position : 8;
    for (const x of Array(doneCells).keys()) {
      cells.push(<div className="Map__cell" style={{ backgroundColor: this.props.roadColor }} />);
    }
    cells.push(
      <div className="Map__cell rocket">
        <img src={this.props.playerIcon} alt="player rocket icon" />
      </div>,
    );
    const noteDoneCells = this.props.position < cellsNumber ? cellsNumber - this.props.position - 1 : 0;
    for (const x of Array(noteDoneCells).keys()) {
      cells.push(<div className="Map__cell" />);
    }
    return (
      <div className="Progress__container">
        <div className="Progress__header">{this.props.header}</div>
        <div className="Progress__Map">{cells}</div>
      </div>
    );
  }
}

export default Progress;
