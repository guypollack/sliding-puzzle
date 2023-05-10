const blankTile = document.getElementById("blank-tile")
let isCheckingOn = false;
let isComplete = false;
let isSolving = false;
let currentPiece = blankTile;
const moves = [];

function stopSolving() {
  isSolving = false;
}

function getValidNeighbours(piece) {
  const validNeighbours = [];

  document.querySelectorAll(".game-piece").forEach(tile => {
    if (tile.id === "blank-tile") return;
    if (tile === piece) return;
    const blankRow = Number(blankTile.classList[blankTile.classList.length -2].replace("row-",""));
    const blankCol = Number(blankTile.classList[blankTile.classList.length -1].replace("col-",""));;
    const tileRow = Number(tile.classList[tile.classList.length -2].replace("row-",""));
    const tileCol = Number(tile.classList[tile.classList.length -1].replace("col-",""));
    const rowDiff = Math.abs(tileRow - blankRow);
    const colDiff = Math.abs(tileCol - blankCol);
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      validNeighbours.push(tile);
    }
  })
  // console.log(validNeighbours);
  return validNeighbours;
}

function scrambleTiles() {
  const tiles = document.querySelectorAll(".game-piece");
  for (let i = 0; i < 50; i++) {
    const validNeighbours = getValidNeighbours(currentPiece);
    // console.log(validNeighbours);
    currentPiece = validNeighbours[Math.floor(Math.random() * validNeighbours.length)];
    movePiece(currentPiece);
  }
  isCheckingOn = true;
  // console.log(moves);
}

function solvePuzzle() {
  // alert("clicked");
  isSolving = true;
  setInterval(() => {
    // console.log("Solving");
    if (!isComplete && isSolving) {
      // const tiles = document.querySelectorAll(".game-piece");
      // const index = Math.floor(Math.random() * tiles.length);
      // const tile = tiles[index];
      // // console.log(tile);
      // // console.log(currentPiece);
      // // console.log(tile === currentPiece);
      // // if (tile !== currentPiece) {
      // //   currentPiece = tile;
      // //   movePiece(currentPiece);  
      // // }
      // movePiece(tile);  
      movePiece(document.querySelector("." + moves.pop()));
    }
  }, 200)
}

function checkIfGameComplete() {
  // alert(querySelectorAll("game-piece"))
  
  isComplete = true;
  document.querySelectorAll(".game-piece").forEach(piece => {
    // alert(piece.dataset.finalRow);
    // alert("A");
    // console.log(piece);
    const pieceRow = piece.classList[piece.classList.length -2].replace("row-","");
    const pieceFinalRow = piece.dataset.finalRow;
    const pieceCol = piece.classList[piece.classList.length -1].replace("col-","");
    const pieceFinalCol = piece.dataset.finalCol;
    if (pieceRow !== pieceFinalRow || pieceCol !== pieceFinalCol) {
      isComplete = false;
    }
  })
  if (isComplete) {
    applyEndOfGameSettings();
  };
}

function applyEndOfGameSettings() {
  setTimeout(() => {
    alert("You win!")
  }, 200);
  document.querySelector(".game-board").classList.add("complete");
  document.querySelectorAll(".game-piece").forEach(piece => {
    piece.removeEventListener("click", handleClick);
    piece.classList.add("complete");
  })
}

function movePiece(piece) {
  // // alert(piece.classList);
  // piece.classList.remove(piece.classList[piece.classList.length -1]);
  // piece.classList.remove(piece.classList[piece.classList.length -1]);
  // piece.classList.add("row-3");
  // piece.classList.add("col-3");
  // // alert(piece.classList);
  const blankRow = Number(blankTile.classList[piece.classList.length -2].replace("row-",""));
  const blankCol = Number(blankTile.classList[piece.classList.length -1].replace("col-",""));;
  const pieceRow = Number(piece.classList[piece.classList.length -2].replace("row-",""));
  const pieceCol = Number(piece.classList[piece.classList.length -1].replace("col-",""));
  const rowDiff = Math.abs(pieceRow - blankRow);
  const colDiff = Math.abs(pieceCol - blankCol);
  
  if (rowDiff === 1 && colDiff === 0) {
    // alert("Can slide");
    if (!isSolving) {
      moves.push(piece.classList[1]);
    }
    piece.classList.remove(piece.classList[piece.classList.length -1]);
    piece.classList.remove(piece.classList[piece.classList.length -1]);
    piece.classList.add("row-" + blankRow);
    piece.classList.add("col-" + blankCol);
    blankTile.classList.remove(blankTile.classList[blankTile.classList.length -1]);
    blankTile.classList.remove(blankTile.classList[blankTile.classList.length -1]);
    blankTile.classList.add("row-" + pieceRow);
    blankTile.classList.add("col-" + pieceCol);
    if (isCheckingOn) {
      checkIfGameComplete();
    }
    // console.log(moves);
  } else if (rowDiff === 0 && colDiff === 1) {
    // alert("Can slide");
    if (!isSolving) {
      moves.push(piece.classList[1]);
    }
    piece.classList.remove(piece.classList[piece.classList.length -1]);
    piece.classList.remove(piece.classList[piece.classList.length -1]);
    piece.classList.add("row-" + blankRow);
    piece.classList.add("col-" + blankCol);
    blankTile.classList.remove(blankTile.classList[blankTile.classList.length -1]);
    blankTile.classList.remove(blankTile.classList[blankTile.classList.length -1]);
    blankTile.classList.add("row-" + pieceRow);
    blankTile.classList.add("col-" + pieceCol);
    if (isCheckingOn) {
      checkIfGameComplete();
    }
    // console.log(moves);
  }
}

function handleClick(e) {
  // alert(e.target.parentNode);
  if (e.target !== blankTile) {
    movePiece(e.target.parentNode);
  };
}

document.querySelectorAll(".game-piece").forEach(piece => {
  // piece.addEventListener("click", () => {
  //   movePiece(piece);
  // })
  piece.addEventListener("click", handleClick)
})

scrambleTiles();
