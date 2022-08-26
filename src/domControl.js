// when square is clicked, returns coordinate
let clickedCoord = [];
function addClickFunction(gridSquare, row, col) {
  gridSquare.addEventListener("click", () => {
    clickedCoord.push(row);
    clickedCoord.push(col);
  });
}

// creates a 10x10 grid and appends to grids container
function createGridDiv(player) {
  const grid = document.createElement("div");
  grid.setAttribute("id", `${player}-grid`);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridSquare = document.createElement("div");
      gridSquare.id = `${player}-X${i}Y${j}`;
      addClickFunction(gridSquare, i, j);
      gridSquare.style.cssText = "background-color: blue";
      grid.appendChild(gridSquare);
    }
  }

  const gridsContainer = document.querySelector("#grids-container");
  gridsContainer.appendChild(grid);
}

function updateBoard(player, boardMap, revealShips = false) {
  // rows
  for (let i = 0; i < 10; i++) {
    //cols
    for (let j = 0; j < 10; j++) {
      //examines coordinate
      const square = boardMap[i][j];
      const squareDiv = document.querySelector(`#${player}-X${i}Y${j}`);
      // if 'h' or 'm'
      if (isNaN(square)) {
        if (square == "h") {
          squareDiv.style.cssText = "background-color: red";
        } else {
          squareDiv.style.cssText = "background-color: black";
        }
      } else {
        // if there is a ship & if we want the ships to be displayed
        if (square > 0 && revealShips) {
          squareDiv.style.cssText = "background-color: grey";
        }
      }
    }
  }
}

module.exports = { createGridDiv, updateBoard, clickedCoord };
