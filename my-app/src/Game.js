import React, { Component } from "react";
import Board from "./components/Board";

class Game extends Component {
  state = {
    board: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: ""
    },
    xIsNext: true,
    arr: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  };

  selectSquare = index => {
    const { board, xIsNext } = this.state;
    if (board[index] === "") {
      this.setState({
        board: { ...board, [index]: xIsNext ? "X" : "O" },
        xIsNext: !xIsNext
      });
    }
  };

  calculateWinner = squares => {
    const lines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

  render() {
    const winner = this.calculateWinner(this.state.board);
    let status;
    if(winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div>
        <div>{status}</div>
        <Board
          arr={this.state.arr}
          board={this.state.board}
          func={this.selectSquare}
        />
      </div>
    );
  }
}

export default Game;
