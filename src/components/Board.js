import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnner: null,
      status: "Next player: X",
      square: Array(9).fill(null),
      isPlayerX: true, // true is X false is O
    };
  }
  handleSquareClick(i) {
    const square = this.state.square.slice();
    square[i] = this.state.isPlayerX ? "X" : "O";
    let status;
    if (this.state.winner === undefined) {
      status = this.state.isPlayerX ? "Next player: O" : "Next player: X";
    } else {
      status = "Winner is " + square[i];
    }
    console.log(this.state.winner);
    console.log(this.state.winner === undefined);
    this.setState({
      square: square,
      isPlayerX: !this.state.isPlayerX,
      status: status,
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.square[i]}
        onClick={() => this.handleSquareClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">{this.state.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
