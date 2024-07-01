function Cell() {
  let value = 'E';
  let isMarked = false;

  const markCell = (playedValue, name) => {
    if (!isMarked) {
      console.log(`Marking ${playedValue} for player ${name}`);
      value = playedValue;
      isMarked = true;
    }
    else {
      console.log('Cell is already marked.');
    }
  }

  const getValue = () => value;

  return { markCell, getValue }
}

// IIFE wrapped factory functions are useful because they limit the number of instances created to 1
const gameboard = (function() {
  const board = [];

  for(let i = 0; i < 3; i++) {
    board[i] = [];
    for(let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  const markCell = (row, column, playedValue, name) => {
    board[row][column].markCell(playedValue, name);
  }

  const printGameboard = () => {
    console.log(board[0][0]);
    console.log(`${board[0][0].getValue()} ${board[0][1].getValue()} ${board[0][2].getValue()}`);
    console.log(`${board[1][0].getValue()} ${board[1][1].getValue()} ${board[1][2].getValue()}`);
    console.log(`${board[2][0].getValue()} ${board[2][1].getValue()} ${board[2][2].getValue()}`);
  }

  return { board, markCell, printGameboard }
})();

const displayController = (function(){
  let playerOneName = "Player 1";
  let playerOneMark = "X";
  let playerTwoName = "Player 2";
  let playerTwoMark = "O";

  const setPlayerOneName = (newPlayerOneName) => {
    playerOneName = newPlayerOneName;
  }

  const setPlayerTwoName = (newPlayerTwoName) => {
    playerTwoName = newPlayerTwoName;
  }

  const players = [
    {
      name: playerOneName,
      mark: playerOneMark
    },
    {
      name: playerTwoName,
      mark: playerTwoMark
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameboard.printGameboard();
    console.log(`${getActivePlayer().name}'s turn.`);
  }

  const playRound = (row, column) => {
    gameboard.markCell(row, column, getActivePlayer().mark, getActivePlayer().name);

    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();

  return { playRound, getActivePlayer, setPlayerOneName, setPlayerTwoName }
})();