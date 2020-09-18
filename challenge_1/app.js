
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

var squares = board.querySelectorAll('td')
for (var i = 0; i < squares.length; i++) {
  squares[i].style.border = '5px solid black';
  squares[i].style.height = '50px'
  squares[i].style.width = '50px'
  squares[i].backgroundColor = 'black';
  squares[i].addEventListener('click', (event) => handleClick(event));
}

var handleClick = (event) => {
  var square = event.target

  markSquare(square);

  var isGameOver = gameOver();
  if (isGameOver) {
    alert(isGameOver);
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
}

var gameOver = () => {
  var diagonals = checkDiagonals();
  var horizontals = checkHorizontals();
  var verticals = checkVerticals();

  if (diagonals) {
    return diagonals;
  }
  if (horizontals) {
    return horizontals;
  }
  if (verticals) {
    return verticals;
  }
  if (turnCount === 9) {
    return 'a draw!';
  }
  return false;
}

var checkVerticals = () => {
  if (boardArray[0][0] === 'x' && boardArray[0][1] === 'x' && boardArray[0][2] === 'x' || boardArray[1][0] === 'x' && boardArray[1][1] === 'x' && boardArray[1][2] ==='x' || boardArray[2][0] === 'x' && boardArray[2][1] === 'x' && boardArray[2][2] === 'x') {
    return 'x wins';
  } else if (boardArray[0][0] === 'o' && boardArray[0][1] === 'o' && boardArray[0][2] === 'o' || boardArray[1][0] === 'o' && boardArray[1][1] === 'o' && boardArray[1][2] === 'o' || boardArray[2][0] === 'o' && boardArray[2][1] === 'o' && boardArray[2][2] === 'o') {
    return 'o wins';
  }
  return false;
}
var checkHorizontals = () => {
  if (boardArray[0][0] === 'x' && boardArray[1][0] === 'x' && boardArray[2][0] === 'x' || boardArray[0][1] === 'x' && boardArray[1][1] === 'x' && boardArray[2][1] === 'x' || boardArray[0][2] === 'x' && boardArray[1][2] === 'x' && boardArray[2][2] === 'x') {
    return 'x wins';
  } else if (boardArray[0][0] === 'o' && boardArray[0][1] === 'o' && boardArray[0][2] === 'o' || boardArray[1][0] === 'o' && boardArray[1][1] === 'o' && boardArray[1][2] === 'o' || boardArray[2][0] === 'o' && boardArray[2][1] === 'o' && boardArray[2][2] === 'o') {
    return 'o wins';
  }
  return false;
}
var checkDiagonals =() => {
  if (boardArray[2][0] === 'x' && boardArray[1][1] === 'x' && boardArray[0][2] === 'x' || boardArray[0][0] === 'x' && boardArray[1][1] === 'x' && boardArray[2][2] === 'x') {
    return 'x wins';
  } else if (boardArray[2][0] === 'o' && boardArray[1][1] === 'o' && boardArray[0][2] === 'o' || boardArray[0][0] === 'o' && boardArray[1][1] === 'o' && boardArray[2][2] === 'o') {
    return 'o wins';
  }
  return false;
}

var turn = true;

var boardArray = [['-','-', '-'],['-','-', '-'],['-','-', '-']];
var turnCount = 0;