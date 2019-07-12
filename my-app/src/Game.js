import React, { Component } from "react";
import Board from "./components/Board";

class Game extends Component {
  state = {
    board: {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: ""
    },
    boardMap: {
      0: "1,1",
      1: "1,2",
      2: "1,3",
      3: "2,1",
      4: "2,2",
      5: "2,3",
      6: "3,1",
      7: "3,2",
      8: "3,3"
    },
    xIsNext: true,
    arr: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0
  };

  selectSquare = index => {
    const { board, xIsNext, history, stepNumber } = this.state;

    let h = history.slice(0, stepNumber + 1);
    let current = h[h.length - 1];
    let squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = xIsNext ? "X" : "O";
    this.setState({
      history: h.concat([{ squares: squares }]),
      board: { ...board, [index]: xIsNext ? "X" : "O" },
      stepNumber: history.length,
      xIsNext: !xIsNext
    });
  };

  calculateWinner = squares => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  render() {
    const winner = this.calculateWinner(this.state.board);
    let status;
    let position;

    let oldMoviment = this.state.history[this.state.stepNumber]
    const moves = this.state.history.map((steps, moves) => {
      
      for (let i = 0; i < steps.squares.length; i++) {
        if (steps.squares[i] !== oldMoviment.squares[i]) {
          let indice = steps.squares.indexOf(steps.squares[i])
          console.log(indice)
          position = this.state.boardMap[indice];
          break;
        }
      }
      const desc = moves ? "Go to move #(lin, col)" + position : "Go to game start";
      return (
        <li key={moves}>
          <button onClick={() => this.jumpTo(moves)}>{desc}</button>
        </li>
      )
    });

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            arr={this.state.arr}
            board={this.state.board}
            func={this.selectSquare}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
