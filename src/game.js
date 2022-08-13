const { GameBoard } = require("./gameboard");
const { Player } = require("./player");
const { randomCoord } = require("./randomCoord");

function Game() {
  let game = true;

  //game setup
  const userBoard = GameBoard();
  const computerBoard = GameBoard();
  //players get access to attack opponent's board
  const user = Player(computerBoard);
  const computer = Player(userBoard);
  // place ships automatically
  computerBoard.autoPlace(randomCoord);
  userBoard.autoPlace(randomCoord);

  //game loop
  while (game) {}
}
Game();
