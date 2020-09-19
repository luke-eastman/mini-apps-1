//--------------------model-----------------------------

var state = {
  board: [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']],
  turnCount: 0,
  xWins: 0,
  oWins: 0,
  player: true,
  over: false,
}
var setWinner = (player) => {
  if (player === 'x') {
    state.player = true;
  } else {
    state.player = false;
  }
}
var resetOver = () => {
  state.over = false;
}
var setOver = () => {
  state.over = true;
}
var isOver = () => {
  return state.over
}
var resetBoard = () => {
  state.board = [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']];
}
var resetPlayer = () => {
  state.player = true;
}
var isPlayerX = () => {
  return state.player === true;
}

var getPiece = (x, y) => {
  return state.board[x][y];
}

var setPiece = (x, y) => {
  if (isPlayerX()) {
    state.board[x][y] = 'x';
  } else {
    state.board[x][y] = 'o';
  }
}

var resetTurnCount = () => {
  state.turnCount = 0;
}

var getTurnCount = () => {
  return state.turnCount;
}

var switchTurns = () => {
  state.player = !state.player;
  setNextPlayer(state.player);
  incrementTurnCount();
}

var incrementTurnCount = () => {
  state.turnCount++;
}

var getWins = (player) => {
  if (player === 'x') {
    return state.xWins;
  } else {
    return state.oWins;
  }
}

var incrementWins = (player) => {
  if (player === 'x') {
    state.xWins++
  } else {
    state.oWins++
  }
}
var getWins = (player) => {
  setWinner(player);
  if (player === 'x') {
    return state.xWins;
  } else {
    return state.oWins;
  }
}

var checkColumns = () => {
  for (var i = 0; i < 3; i++) {
    if (isColOf('x', i)) {
      incrementWins('x');
      return '"X" wins';
    }
    if (isColOf('o', i)) {
      incrementWins('o');
      return '"O" wins';
    }
  }
}

var checkRows = () => {
  for (var i = 0; i < 3; i++) {
    if (isRowOf('x', i)) {
      incrementWins('x');
      return '"X" wins';
    }
    if (isRowOf('o', i)) {
      incrementWins('o');
      return '"O" wins';
    }
  }
}

var checkDiagonals = () => {
  if (diagonalsOf('x')) {
    incrementWins('x');
    return '"X" wins';
  }
  if (diagonalsOf('o')) {
    incrementWins('o');
    return '"O" wins';
  }
}

var isO = (x,y) => {
  return getPiece(x, y) === 'o';
}

var isX = (x,y) => {
  return getPiece(x, y) === 'x';
}

var isColOf = (player, col) => {
  if (player === 'x') {
    return isX(0, col) && isX(1, col) && isX(2, col);
  } else {
    return isO(0, col) && isO(1, col) && isO(2, col);
  }
}

var isRowOf = (player, row) => {
  if (player === 'x') {
    return isX(row, 0) && isX(row, 1) && isX (row, 2);
  } else {
    return isO(row, 0) && isO(row, 1) && isO (row, 2);
  }
}

var diagonalsOf = (player) => {
  return majorDiagonalOf(player) || minorDiagonalOf(player);
}

var majorDiagonalOf = (player) => {
  if (player === 'x') {
    return isX(0, 0) && isX(1, 1) && isX(2, 2);
  } else {
    return isO(0, 0) && isO(1, 1) && isO(2, 2);
  }
}

var minorDiagonalOf = (player) => {
  if (player === 'x') {
    return isX(0, 2) && isX(1, 1) && isX(2, 0);
  } else {
    return isO(0, 2) && isO(1, 1) && isO(2, 0);
  }
}

//--------------------view------------------------------------------
var body = document.body;
var title = document.createElement('h1');
title.innerHTML = 'Tic Tac Toe';
body.prepend(title);

var whichPlayer = document.createElement('h4');
whichPlayer.classList.add('which-turn');
whichPlayer.innerHTML = '"X" is up!';
body.append(whichPlayer);

var setNextPlayer = (player) => {
  if (player === true) {
    whichPlayer.innerHTML = '"X" is up!';
  } else {
    whichPlayer.innerHTML = '"O" is up!';
  }
}


var board = document.createElement('table');
body.append(board);
board.style.emptyCells =  'show';



boardBody = document.createElement('tbody');
var rowOne = document.createElement('tr');
var rowTwo = document.createElement('tr');
var rowThree = document.createElement('tr');
rowOne.classList.add('row-one');
rowTwo.classList.add('row-two');
rowThree.classList.add('row-three');

boardBody.append(rowOne);
boardBody.append(rowTwo);
boardBody.append(rowThree);
board.append(boardBody);

var rowOneColumnOne = document.createElement('td');
var rowOneColumnTwo = document.createElement('td');
var rowOneColumnThree = document.createElement('td');
rowOne.append(rowOneColumnOne);
rowOne.append(rowOneColumnTwo);
rowOne.append(rowOneColumnThree);

var rowTwoColumnOne = document.createElement('td');
var rowTwoColumnTwo = document.createElement('td');
var rowTwoColumnThree = document.createElement('td');
rowTwo.append(rowTwoColumnOne);
rowTwo.append(rowTwoColumnTwo);
rowTwo.append(rowTwoColumnThree);

var rowThreeColumnOne = document.createElement('td');
var rowThreeColumnTwo = document.createElement('td');
var rowThreeColumnThree = document.createElement('td');
rowThree.append(rowThreeColumnOne);
rowThree.append(rowThreeColumnTwo);
rowThree.append(rowThreeColumnThree);

var resetGameButton = document.createElement('button');
resetGameButton.innerHTML = 'Reset Game';
board.append(resetGameButton);
resetGameButton.addEventListener('click', (event) => resetGame());

var wins = document.createElement('div');
wins.classList.add('wins');
var XWins = document.createElement('div');
XWins.classList.add('x-wins');
XWins.innerHTML = '"X" Wins: 0';
wins.append(XWins);
var OWins = document.createElement('div');
OWins.classList.add('o-wins');
OWins.innerHTML = '"O" Wins: 0';
wins.append(XWins);
wins.append(OWins);
body.append(wins);

var squares = board.querySelectorAll('td')
for (var i = 0; i < squares.length; i++) {
  squares[i].style.border = '5px solid black';
  squares[i].style.height = '50px'
  squares[i].style.width = '50px'
  squares[i].backgroundColor = 'black';
  squares[i].addEventListener('click', (event) => handleClick(event));

  var updateWins = () => {
    XWins.innerHTML = `"X" Wins :${getWins('x')}`;
    OWins.innerHTML = `"O" Wins :${getWins('o')}`;
  }
}
//--------------------controller----------------------------------------
var handleClick = (event) => {
  if (isOver()) {
    alert('reset game to play again');
    return;
  }
  var square = event.target
  markSquare(square);
  var gameIsOver = gameOver();
  if (gameIsOver) {
    updateWins();
    alert(gameIsOver);
  }
}

var getIndex = (square) => {
  if (square.parentElement.classList.contains('row-one')) {
    return 0;
  } else if (square.parentElement.classList.contains('row-two')) {
    return 1;
  } else if (square.parentElement.classList.contains('row-three')) {
    return 2;
  }
}

var markSquare = (square) => {
  var x = square.cellIndex;
  var y = getIndex(square);
  if (isPlayerX()) {
    if (getPiece(y, x) === '-') {
      setPiece(y, x);
      square.innerHTML = 'X';
      switchTurns();
    } else {
      alert('seats taken')
    }
  } else if (!isPlayerX()) {
    if (getPiece(y, x) === '-') {
      setPiece(y, x);
      square.innerHTML = 'O';
      switchTurns();
    } else {
      alert('seats taken')
    }
  }
}

var resetGame = () => {
  var squares = board.querySelectorAll('td')
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = '';
  }
  resetBoard();
  resetTurnCount();
  resetOver();
}

var gameOver = () => {
  var diagonals = checkDiagonals();
  var horizontals = checkRows();
  var verticals = checkColumns();

  if (diagonals) {
    setOver();
    return diagonals;
  }
  if (horizontals) {
    setOver();
    return horizontals;
  }
  if (verticals) {
    setOver();
    return verticals;
  }
  if(getTurnCount() === 9) {
    setOver();
    return 'a draw!';
  }
  return false;
}


