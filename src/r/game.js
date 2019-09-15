import React from "react";

import { Board } from "./board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = newGame();
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[0];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: [
        {
          squares: squares
        }
      ].concat(history),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      history: this.state.history.slice((step + 1) * -1),
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  reset() {
    this.setState(newGame());
  }

  render() {
    const history = this.state.history;
    const current = history[0];
    const winner = calculateWinner(current.squares);

    const moves = history
      .slice()
      .reverse()
      .map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      })
      .slice(0, -1);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = `Next move, player: ${this.state.xIsNext ? "X" : "O"}`;
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
          <div>{`Moves: ${this.state.stepNumber}`}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
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
    stepNumber: 0,
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
