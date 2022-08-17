const { randomCoord } = require("./randomCoord");
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

  //interates through boardmap to see if ship placement is legal
  function legalPlacement(row, col, orient, length) {
    for (let i = 0; i < length; i++) {
      // out of range
      if (boardMap[row][col] == null) {
        return false;
      } //prevent overlap
      else if (boardMap[row][col] > 0) {
        return false;
      }
      orient == "horizontal" ? col++ : row++;
    }
    //legal ship placement
    return true;
  }

  //places 5 ships randomly
  const autoPlace = (randomCoord) => {
    let row = 0;
    let col = 0;
    let orient = "horizontal";
    let length = 0;
    let lengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < lengths.length; i++) {
      // loops until legal ship placement is found
      do {
        row = randomCoord();
        col = randomCoord();
        //horizontal if even, vertical if odd
        randomCoord() % 2 == 0
          ? (orient = "horizontal")
          : (orient = "vertical");
        length = lengths[i];
      } while (!legalPlacement(row, col, orient, length));

      placeShip(row, col, orient, length);
    }
  };

  return { boardMap, placeShip, receiveAttack, allSunk, autoPlace };
};

module.exports = { GameBoard };
