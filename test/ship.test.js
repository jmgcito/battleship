const { Ship } = require("../src/ship");

test("hit() function marks specific position of ship as hit", () => {
  const testShip = Ship([
    [6, 4],
    [6, 5],
    [6, 6],
  ]);

  //hits middle of ship
  expect(testShip.shipParts[1].hit).toBeFalsy();
  testShip.hit(6, 5);
  expect(testShip.shipParts[1].hit).toBeTruthy();
});

test("ship is sunk only if every part is hit", () => {
  const testShip = Ship([
    [6, 4],
    [6, 5],
    [6, 6],
  ]);

  testShip.hit(6, 6);
  expect(testShip.isSunk()).toBeFalsy();
  testShip.hit(6, 4);
  expect(testShip.isSunk()).toBeFalsy();
  testShip.hit(6, 4);
  expect(testShip.isSunk()).toBeFalsy();
  testShip.hit(6, 5);
  expect(testShip.isSunk()).toBeTruthy();
});
