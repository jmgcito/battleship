const { GameBoard } = require("../src/gameboard");

test("place ships at specific coordinates", () => {
  const testBoard = GameBoard();

  testBoard.placeShip(0, 0, "horizontal", 2);
  testBoard.placeShip(0, 3, "vertical", 3);
  testBoard.placeShip(0, 6, "horizontal", 4);
  testBoard.placeShip(2, 0, "vertical", 4);
  testBoard.placeShip(2, 5, "horizontal", 3);
  testBoard.placeShip(2, 9, "vertical", 2);
  testBoard.placeShip(5, 5, "vertical", 2);
  testBoard.placeShip(5, 9, "vertical", 3);
  testBoard.placeShip(9, 4, "horizontal", 6);

  expect(testBoard.boardMap).toEqual([
    [1, 1, 0, 2, 0, 0, 3, 3, 3, 3],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 2, 0, 5, 5, 5, 0, 6],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 7, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 7, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 9, 9, 9, 9, 9, 9],
  ]);
});

test("receiveAttack() determines if shot is hit or missed, records result", () => {
  const testBoard = GameBoard();

  testBoard.placeShip(0, 0, "horizontal", 2);
  testBoard.placeShip(0, 3, "vertical", 3);
  testBoard.placeShip(0, 6, "horizontal", 4);
  testBoard.placeShip(2, 0, "vertical", 4);
  testBoard.placeShip(2, 5, "horizontal", 3);
  testBoard.placeShip(2, 9, "vertical", 2);
  testBoard.placeShip(5, 5, "vertical", 2);
  testBoard.placeShip(5, 9, "vertical", 3);
  testBoard.placeShip(9, 4, "horizontal", 6);

  //true if hit
  expect(testBoard.receiveAttack(0, 0)).toBeTruthy;
  expect(testBoard.receiveAttack(2, 6)).toBeTruthy;
  expect(testBoard.receiveAttack(2, 9)).toBeTruthy;
  expect(testBoard.receiveAttack(4, 0)).toBeTruthy;
  expect(testBoard.receiveAttack(9, 5)).toBeTruthy;

  //false if miss
  expect(testBoard.receiveAttack(0, 2)).toBeFalsy;
  expect(testBoard.receiveAttack(5, 7)).toBeFalsy;
  expect(testBoard.receiveAttack(7, 7)).toBeFalsy;
  expect(testBoard.receiveAttack(9, 0)).toBeFalsy;
  expect(testBoard.receiveAttack(9, 2)).toBeFalsy;

  expect(testBoard.boardMap).toEqual([
    ["h", 1, "m", 2, 0, 0, 3, 3, 3, 3],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 2, 0, 5, "h", 5, 0, "h"],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    ["h", 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 7, 0, "m", 0, 8],
    [0, 0, 0, 0, 0, 7, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, "m", 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["m", 0, "m", 0, 9, "h", 9, 9, 9, 9],
  ]);
});

test("gameboard reports whether all ships are sunk or not", () => {
  const testBoard = GameBoard();

  testBoard.placeShip(0, 0, "horizontal", 2);
  testBoard.placeShip(0, 3, "vertical", 3);
  testBoard.placeShip(0, 6, "horizontal", 4);

  //true if hit
  expect(testBoard.receiveAttack(0, 0)).toBeTruthy;
  expect(testBoard.receiveAttack(0, 1)).toBeTruthy;
  expect(testBoard.allSunk()).toBeFalsy();

  expect(testBoard.receiveAttack(0, 6)).toBeTruthy;
  expect(testBoard.receiveAttack(0, 7)).toBeTruthy;
  expect(testBoard.receiveAttack(0, 8)).toBeTruthy;
  expect(testBoard.receiveAttack(0, 9)).toBeTruthy;
  expect(testBoard.allSunk()).toBeFalsy();

  expect(testBoard.receiveAttack(0, 3)).toBeTruthy;
  expect(testBoard.receiveAttack(1, 3)).toBeTruthy;
  expect(testBoard.receiveAttack(2, 3)).toBeTruthy;
  expect(testBoard.allSunk()).toBeTruthy();
});

test("autoPlace places all ships randomly without any overlapping", () => {
  const testBoard = GameBoard();

  // autoplace has 3 random numbers per iteration: row, col, horizontal(even) or vertical(odd)
  let randomArr = [
    1, 6, 1, 0, 9, 1, 4, 7, 0, 8, 1, 0, 0, 2, 6, 1, 7, 2, 0, 4, 3,
  ];
  const mockRandomCoord = jest.fn(() => {
    return randomArr.pop();
  });

  testBoard.autoPlace(mockRandomCoord);

  expect(testBoard.boardMap).toEqual([
    [0, 3, 3, 3, 0, 0, 0, 4, 4, 4],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect;
});
