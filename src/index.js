import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Square = (props) => {
  return (
    <button className='squareStyles'
      onClick={props.onClickEvent} >
      {props.value}
    </button>
  )
}
const initialSquares = Array(9).fill(null);
const Board = () => {

  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setXIsNext] = useState(true)

  const handleClickEvent = (i) => {
    const newSquares = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if (winnerDeclared || squareFilled) {
      return
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }
  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
    );
  };

  const winner = calculateWinner(squares)
  const status = winner ?
    `Winner: ${winner}` :
    `Next Player: ${xIsNext ? 'X' : 'O'}`

  const handleOnclick = () => {
    return setSquares(initialSquares)
  }
  return (
    <div>
      <div className='boardStyles'>{status}</div>
      <div className='board-row'>
        {renderSquare(1)} {renderSquare(2)} {renderSquare(3)}
      </div>
      <div className='board-row'>
        {renderSquare(4)} {renderSquare(5)} {renderSquare(6)}
      </div>
      <div className='board-row'>
        {renderSquare(7)} {renderSquare(8)} {renderSquare(9)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <button style={{ backgroundColor: 'black', color: 'white' , padding: '10px' }} onClick={() => handleOnclick()}>Refresh</button>
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className="gameStyles">
      Tic-Tac-Toe
      <Board />

    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squeare) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],//Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8],//Verticales
    [0, 4, 8], [2, 4, 6]//Diagonales
  ]
  for (let line of lines) {
    const [a, b, c] = line;
    if (squeare[a] && squeare[a] === squeare[b] && squeare[a] === squeare[c]) {
      return squeare[a];
    }
  }
  return null;
}