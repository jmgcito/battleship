const { Ship } = require("./ship");

const GameBoard = () => {
  let boardMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let ships = [];
  let sunkenShips = 0;

  const placeShip = (row, col, orient, length) => {
    //fills coordinates which will be used to call Ship()
    let shipParts = [];

    // populates boardmap with number of ship indicating ship id
    for (let i = 0; i < length; i++) {
      boardMap[row][col] = ships.length + 1;
      shipParts.push([row, col]);

      //iterated through column if ship is horizontal
      if (orient == "horizontal") {
        col++;
      } else {
        row++;
      }
    }
    //calls Ship with coordinated, stored in ships array
    ships.push(Ship(shipParts));
  };

  const receiveAttack = (row, col) => {
    let shipID = boardMap[row][col];

    // if hit
    if (shipID > 0) {
      let ship = ships[shipID - 1];
      ship.hit(row, col);

      // adds to sunken ships if ship returns true
      if (ship.isSunk()) {
        sunkenShips++;
      }
      boardMap[row][col] = "h";
      return true;
    } else {
      boardMap[row][col] = "m";
      return false;
    }
  };

  const allSunk = () => {
    if (ships.length - sunkenShips == 0) {
      return true;
    } else {
      return false;
    }
  };

  return { boardMap, placeShip, receiveAttack, allSunk };
};

module.exports = { GameBoard };
