import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      winner: null,
      status: "Next player: X",
      square: Array(9).fill(null),
      isPlayerX: true, // true is X false is O
    };
  }
  winner(pt) {
    let i;
    //Diagonal 1
    if (pt / 2 === 0 && pt / 2 < 4 && 0 < pt) {
      for (i = 1; i < 4; i++) {
        if (this.state.square[i * 2] !== this.state.square[pt]) {
          return false;
        }
      }
      return true;
    }
    //Diagonal 2
    if (pt / 4 === 0) {
      for (i = 0; i < 3; i++) {
        if (this.state.square[i * 4] !== this.state.square[pt]) {
          return false;
        }
      }
    }
    //Horizontal
  }
  handleSquareClick(i) {
    if (this.state.square[i] === null) {
      const square = this.state.square.slice();
      square[i] = this.state.isPlayerX ? "X" : "O";
      let status;
      this.setState({
        square: square,
      });
      // this.setState({
      //   winner: this.winner(i),
      // });
      if (this.state.winner === null) {
        status = this.state.isPlayerX ? "Next player: O" : "Next player: X";
      } else {
        status = "Winner is " + square[i];
      }
      // console.log(this.state.winner);
      // console.log(this.state.winner === null);
      this.setState({
        isPlayerX: !this.state.isPlayerX,
        status: status,
        error: null,
      });
    } else {
      this.setState({
        error: "Choose another Square",
      });
    }
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
        <div className="status">{this.state.error}</div>
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
