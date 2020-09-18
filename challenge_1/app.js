
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
}

var turn = 'x';

var boardArray = [['-','-', '-'],['-','-', '-'],['-','-', '-']];

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
  if (turn === 'x') {
    boardArray[y][x] = 'x'
    square.innerHTML = 'X';
    turn = 'o';
  } else if (turn === 'o') {
    boardArray[y][x] = 'o'
    square.innerHTML = 'O';
    turn = 'x';
  }
  console.log(boardArray[0]);
  console.log(boardArray[1]);
  console.log(boardArray[2]);
  console.log('----------')

}
