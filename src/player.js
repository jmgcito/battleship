const Player = (GameBoard) => {
  const enemyBoard = GameBoard;

  function legalMove(row, col) {
    if (row < 0 || 9 < row) {
      return false;
    }
    if (col < 0 || 9 < col) {
      return false;
    }
    if (isNaN(enemyBoard.boardMap[row][col])) {
      return false;
    }
    return true;
  }

  const attack = (row, col) => {
    enemyBoard.receiveAttack(row, col);
  };

  const autoPlay = (randomCoord) => {
    let row = randomCoord();
    let col = randomCoord();

    while (!legalMove(row, col)) {
      row = randomCoord();
      col = randomCoord();
    }
    attack(row, col);
  };

  return { attack, autoPlay, legalMove };
};

module.exports = { Player };
