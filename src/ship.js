const Ship = (coords) => {
  const length = coords.length;
  let amountHit = 0;

  const shipParts = [];
  // ship parts are identified by index, each part indicates if hit
  for (let i = 0; i < length; i++) {
    shipParts[i] = { row: coords[i][0], col: coords[i][1], hit: false };
  }

  const hit = (row, col) => {
    for (let i = 0; i < length; i++) {
      // finds ship part with matching coordinates
      if (shipParts[i].row == row && shipParts[i].col == col) {
        if (!shipParts[i].hit) {
          shipParts[i].hit = true;
          amountHit++;
        }
        return;
      }
    }
  };

  const isSunk = () => {
    if (length - amountHit == 0) {
      return true;
    } else {
      return false;
    }
  };

  return { shipParts, hit, isSunk };
};

module.exports = { Ship };
