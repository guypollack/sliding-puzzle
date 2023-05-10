const blankTile = document.getElementById("blank-tile")
let isCheckingOn = false;

function scrambleTiles() {
  const tiles = document.querySelectorAll(".game-piece");
  for (let i = 0; i < 100; i++) {
    const index = Math.floor(Math.random() * tiles.length);
    movePiece(tiles[index]);
  }
  isCheckingOn = true;
}

function checkIfGameComplete() {
  // alert(querySelectorAll("game-piece"))
  
  let isComplete = true;
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
  } else if (rowDiff === 0 && colDiff === 1) {
    // alert("Can slide");
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
