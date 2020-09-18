
var body = document.body;

var board = document.createElement('table');
body.prepend(board);
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
}

var handleClick = (event) => {
  if (over) {
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
var updateWins = () => {
  XWins.innerHTML = `"X" Wins :${xWins}`;
  OWins.innerHTML = `"O" Wins :${oWins}`;
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
  if (turn === true) {
    if (boardArray[y][x] === '-') {
      boardArray[y][x] = 'x'
      square.innerHTML = 'X';
      switchTurns();
    } else {
      alert('seats taken')
    }
  } else if (turn === false) {
    if (boardArray[y][x] === '-') {
      boardArray[y][x] = 'o'
      square.innerHTML = 'O';
      switchTurns();
    } else {
      alert('seats taken')
    }
  }
}

var switchTurns = () => {
  turn = !turn;
  turnCount++;
}

var resetGame = () => {
  var squares = board.querySelectorAll('td')
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = '';
  }
  boardArray = [['-','-', '-'],['-','-', '-'],['-','-', '-']];
  turn = true;
  turnCount = 0;
  over = false;


}

var gameOver = () => {
  var diagonals = checkDiagonals();
  var horizontals = checkRows();
  var verticals = checkColumns();

  if (diagonals) {
    over = true;
    return diagonals;
  }
  if (horizontals) {
    over = true;
    return horizontals;
  }
  if (verticals) {
    over = true;
    return verticals;
  }
  if (turnCount === 9) {
    return 'a draw!';
  }
  return false;
}



var turn = true;
var over = false;
var boardArray = [['-','-', '-'],['-','-', '-'],['-','-', '-']];
var turnCount = 0;
var xWins = 0;
var oWins = 0;

var checkColumns = () => {
  for (var i = 0; i < 3; i++) {
    if (colOfX(i)) {
      xWins++;
      return '"X" wins';
    }
    if (colOfO(i)) {
      oWins++;
      return '"O" wins';
    }
  }
}

var checkRows = () => {
  for (var i = 0; i < 3; i++) {
    if (rowOfX(i)) {
      xWins++;
      return '"X" wins';
    }
    if (rowOfO(i)) {
      oWins++;
      return '"O" wins';
    }
  }
}

var checkDiagonals = () => {
  if (diagonalsOfX()) {
    xWins++;
    return '"X" wins';
  }
  if (diagonalsOfO()) {
    oWins++;
    return '"O" wins';
  }
}

var isO = (x,y) => {
  return boardArray[x][y] === 'o';
}

var isX = (x,y) => {
  return boardArray[x][y] === 'x';
}

var colOfX = (col) => {
  return isX(0, col) && isX(1, col) && isX(2, col);
}

var colOfO = (col) => {
  return isO(0, col) && isO(1, col) && isO(2, col);
}

var rowOfX = (row) => {
  return isX(row, 0) && isX(row, 1) && isX (row, 2);
}

var rowOfO = (row) => {
  return isO(row, 0) && isO(row, 1) && isO (row, 2);
}

var diagonalsOfX = () => {
  return majorDiagonalOfX() || minorDiagonalOfX();
}

var diagonalsOfO = () => {
  return majorDiagonalOfO() || minorDiagonalOfO();
}

var majorDiagonalOfX = () => {
  return isX(0, 0) && isX(1, 1) && isX(2, 2);
}

var majorDiagonalOfO = () => {
  return isO(0, 0) && isO(1, 1) && isO(2, 2);
}

var minorDiagonalOfX = () => {
  return isX(0, 2) && isX(1, 1) && isX(2, 0);
}

var minorDiagonalOfO = () => {
  return isO(0, 2) && isO(1, 1) && isO(2, 0);
}