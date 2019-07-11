import React from "react";
import "./index.css";

const Board = props => (
  <div>
    {props.arr.map((item, linha) => (
      <div className="board-row" key={linha}>
        {item.map((index, coluna) => (
          <button
            key={coluna}
            className="square"
            onClick={() =>
              props.func(index)
            }
          >
            {props.board[index]}
          </button>
        ))}
      </div>
    ))}
  </div>
);
export default Board;
