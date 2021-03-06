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
      history: [Array(9).fill(null)],
      stepNumber: 0,
    };
  }

  winner(square, pt) {
    let i;
    let flag;

    //Diagonal 1
    if (pt % 2 === 0 && pt / 2 < 4 && 0 < pt) {
      flag = true;
      for (i = 1; i < 4; i++) {
        if (square[i * 2] !== square[pt]) {
          console.log(i * 2);
          flag = false;
          break;
        }
      }
      if (flag) return square[pt];
    }

    //Diagonal 2
    if (pt % 4 === 0) {
      flag = true;
      for (i = 0; i < 3; i++) {
        if (square[i * 4] !== square[pt]) {
          flag = false;
        }
      }
      if (flag) return square[pt];
    }

    //Horizontal
    flag = true;
    for (i = Math.floor(pt / 3) * 3; i < (Math.floor(pt / 3) + 1) * 3; i++) {
      if (square[i] !== square[pt]) {
        flag = false;
      }
    }
    if (flag) return square[pt];

    //Vertical
    flag = true;
    for (i = pt % 3; i <= (pt % 3) + 6; i += 3) {
      if (square[i] !== square[pt]) {
        flag = false;
      }
    }
    if (flag) return square[pt];

    return null;
  }

  handleSquareClick(i) {
    if (this.state.winner === null && this.state.square[i] === null) {
      const square = this.state.square.slice();
      square[i] = this.state.isPlayerX ? "X" : "O";
      let status;
      this.setState({
        square: square,
      });
      let winner = this.winner(square, i);
      if (winner === null) {
        status = this.state.isPlayerX ? "Next player: O" : "Next player: X";
      } else {
        status = "Winner is " + square[i];
      }
      let history = this.state.history.slice(0, this.state.stepNumber + 1);
      console.log(history);
      console.log(square);
      history.push(square);
      this.setState({
        isPlayerX: !this.state.isPlayerX,
        status: status,
        error: null,
        winner: winner,
        stepNumber: this.state.stepNumber + 1,
        history: history,
      });
    } else {
      this.setState({
        error: this.state.winner === null ? "Choose another Square" : "",
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

  jumpTo(i) {
    this.setState({
      stepNumber: i,
      isPlayerX: i % 2 === 0,
      square: this.state.history[i],
    });
    this.render();
  }

  render() {
    const moves = this.state.history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li>
          {" "}
          <button onClick={() => this.jumpTo(move)}>{desc}</button>{" "}
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
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
        <div className="game-info">
          <div className="status">{this.state.status}</div>
          <div className="status">{this.state.error}</div>
          <div className="status">
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}
