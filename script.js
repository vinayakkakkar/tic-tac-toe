document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const cells = [];
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let againstBot = false; 
  
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", cellClick);
      cells.push(cell);
      board.appendChild(cell);
    }
  
    function cellClick() {
      const index = this.dataset.index;
  
      if (gameBoard[index] === "" && !isGameOver()) {
        gameBoard[index] = currentPlayer;
        updateBoard();
  
        if (!isGameOver() && againstBot && currentPlayer === "X") {
          setTimeout(makeBotMove, 500);
        } else {
          switchPlayer();
        }
      }
    }
  
    function makeBotMove() {
      let emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === "") {
          acc.push(index);
        }
        return acc;
      }, []);
  
      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botMove = emptyCells[randomIndex];
  
        gameBoard[botMove] = currentPlayer;
        updateBoard();
        switchPlayer();
      }
    }
  
    function updateBoard() {
      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = gameBoard[i];
      }
  
      if (isGameOver()) {
        alert("Game Over! Player " + currentPlayer + " wins!");
        resetGame();
      } else if (gameBoard.every((cell) => cell !== "")) {
        alert("It's a draw!");
        resetGame();
      }
    }
  
    function switchPlayer() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  
    function isGameOver() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
      ];
  
      return winPatterns.some((pattern) =>
        pattern.every((index) => gameBoard[index] === currentPlayer)
      );
    }
  
    function resetGame() {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      updateBoard();
    }
  
    function toggleGameMode() {
      againstBot = !againstBot;
      resetGame();
      document.getElementById("game-mode").textContent = againstBot
        ? "Playing with Bot"
        : "Playing with Human";
    }
  });
  