// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// DOM elements
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const messageDiv = document.getElementById('message');

// Create the game board dynamically
function createBoard() {
  board.innerHTML = ''; // Clear the board first
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.setAttribute('data-index', index);
    cellDiv.textContent = cell;
    board.appendChild(cellDiv);
  });
}

// Handle a click on the game board
board.addEventListener('click', (event) => {
  if (gameOver) return; // If the game is over, ignore clicks

  const clickedCell = event.target;
  const index = clickedCell.getAttribute('data-index');
  
  // If the clicked cell is already taken, return
  if (gameBoard[index] !== '') return;

  // Update the game state
  gameBoard[index] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add('taken');

  // Check for a winner
  if (checkWinner(currentPlayer)) {
    gameOver = true;
    messageDiv.textContent = `${currentPlayer} wins!`;
    return;
  }

  // Check for a draw
  if (gameBoard.every(cell => cell !== '')) {
    gameOver = true;
    messageDiv.textContent = "It's a draw!";
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageDiv.textContent = `Player ${currentPlayer}'s turn`;
});

// Function to check if a player has won
function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === player);
  });
}

// Reset the game state
resetButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  messageDiv.textContent = `Player ${currentPlayer}'s turn`;
  createBoard(); // Rebuild the board
});

// Initialize the game board on page load
createBoard();
messageDiv.textContent = `Player ${currentPlayer}'s turn`;
