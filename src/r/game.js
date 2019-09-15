import React from "react";

import { Board } from "./board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = newGame();
    // {
    //   history: [
    //     {
    //       squares: Array(9).fill(null)
    //     }
    //   ],
    //   xIsNext: true
    // };
  }

  handleClick(i) {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[0];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      // history: history.concat([
      //   {
      //     squares: squares
      //   }
      // ]),
      history: [
        {
          squares: squares
        }
      ].concat(history),
      xIsNext: !this.state.xIsNext
    });
  }

  reset() {
    this.setState(newGame());
  }

  render() {
    const history = this.state.history;
    const current = history[0];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
          <button className="reset-btn" onClick={() => this.reset()}>
            new game
          </button>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function newGame() {
  return {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true
  };
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
