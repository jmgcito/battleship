const { GameBoard } = require("./gameboard");
const { Player } = require("./player");
const { randomCoord } = require("./randomCoord");
const domControl = require("./domControl");

//game setup
const userBoard = GameBoard();
const computerBoard = GameBoard();
const user = Player(computerBoard);
const computer = Player(userBoard);
let shipLengths = [2, 3, 3, 4, 5];
let orient = "horizontal";
let gameOn = true;

//sets up game
function Game() {
  setMode(0);
  computerBoard.autoPlace(randomCoord);
  domControl.createGridDiv("user");
  domControl.createGridDiv("computer");
  updateBoards();
}

function checkWin() {
  if (computerBoard.allSunk() || userBoard.allSunk()) {
    gameOn = false;
  }
  return gameOn;
}

function updateBoards() {
  domControl.updateBoard("user", userBoard.boardMap, true);
  domControl.updateBoard("computer", computerBoard.boardMap);
}
//checks if ready to change from setting ships to attack mode
function checkMode() {
  if (shipLengths.length < 1) {
    setMode(1);
  }
}

// makes move based on player decision
function makeMove() {
  const col = domControl.clickedCoord.pop();
  const row = domControl.clickedCoord.pop();

  //ensures no repeat moves
  if (user.legalMove(row, col) && gameOn) {
    user.attack(row, col);
    checkWin();

    //no more computer moves if user wins and vice versa
    if (gameOn) {
      computer.autoPlay(randomCoord);
      checkWin();
    }
    updateBoards();
  }
}

// sets ships based where player wants it
function setShips() {
  const col = domControl.clickedCoord.pop();
  const row = domControl.clickedCoord.pop();
  let length = shipLengths.pop();

  // checks if user placement legal
  if (userBoard.legalPlacement(row, col, orient, length)) {
    userBoard.placeShip(row, col, orient, length);
  } // if not legal, pushes back length into array
  else {
    shipLengths.push(length);
  }

  updateBoards();
  checkMode();
}

// sets two modes: setting ships, or attack mode
function setMode(mode) {
  if (mode == 1) {
    window.removeEventListener("click", setShips);
    window.addEventListener("click", makeMove);
  } else {
    window.removeEventListener("click", makeMove);
    window.addEventListener("click", setShips);
  }
}

module.exports = Game;
