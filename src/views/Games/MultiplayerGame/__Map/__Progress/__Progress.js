import React from 'react';

import './__Progress.scss';

class Progress extends React.Component {
  render() {
    const cellsNumber = 3;
    const cells = [];
    const { turns } = this.props;
    for (let index = 0; index < cellsNumber; index++) {
      if (index === this.props.position) {
        cells.push(
          <div className="Map__cell rocket">
            <img src={this.props.playerIcon} alt="player rocket icon" />
          </div>,
        );
      } else if (turns.length > index) {
        if (turns[index] === 'true' || turns[index] === true) {
          cells.push(
            <div className="Map__cell" style={{ backgroundColor: this.props.rightColor }} />,
          );
        } else {
          cells.push(
            <div className="Map__cell" style={{ backgroundColor: this.props.wrongColor }} />,
          );
        }
      } else {
        cells.push(<div className="Map__cell" />);
      }
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
