const { GameBoard } = require("../src/gameboard");
const { Player } = require("../src/player");

test("a player's turn attacks the enemy gameboard", () => {
  const enemyBoard = GameBoard();
  const testPlayer = Player(enemyBoard);

  enemyBoard.placeShip(5, 5, "vertical", 4);
  testPlayer.attack(0, 0);
  testPlayer.attack(9, 9);
  testPlayer.attack(6, 5);
  testPlayer.attack(7, 5);

  expect(enemyBoard.boardMap).toEqual([
    ["m", 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "h", 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "h", 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "m"],
  ]);
});

test("computer players make legal moves", () => {
  const enemyBoard = GameBoard();
  const computer = Player(enemyBoard);

  enemyBoard.placeShip(5, 5, "vertical", 4);

  let randomArr = [5, 5, 10, 1, 0, 0, 0, 0];
  const mackRandomCoord = jest.fn(() => {
    return randomArr.pop();
  });
  computer.autoPlay(mackRandomCoord);
  computer.autoPlay(mackRandomCoord);

  expect(enemyBoard.boardMap).toEqual([
    ["m", 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "h", 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test.todo("makes sure non-computer player's turn is legal");
