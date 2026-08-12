let turn = "x";
let square = [];
let gameActive = true;
let moveCount = 0;
let scoreX = 0;
let scoreO = 0;
let winningCells = [];

const title = document.getElementById('title');
const moveCountDisplay = document.getElementById('moveCount');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

// Load scores from local storage
function loadScores() {
    const savedScoreX = localStorage.getItem('ticTacToeScoreX');
    const savedScoreO = localStorage.getItem('ticTacToeScoreO');
    if (savedScoreX) scoreX = parseInt(savedScoreX);
    if (savedScoreO) scoreO = parseInt(savedScoreO);
    updateScoreDisplay();
}

// Save scores to local storage
function saveScores() {
    localStorage.setItem('ticTacToeScoreX', scoreX);
    localStorage.setItem('ticTacToeScoreO', scoreO);
}

// Update score display
function updateScoreDisplay() {
    scoreXDisplay.innerHTML = scoreX;
    scoreODisplay.innerHTML = scoreO;
}

// Update move counter
function updateMoveCount() {
    moveCountDisplay.innerHTML = moveCount;
}

function end(num1, num2, num3, winner) {
    gameActive = false;
    winningCells = [num1, num2, num3];

    title.innerHTML = `🎉 Player ${winner.toUpperCase()} Wins!`;

    // Highlight winning cells
    document.getElementById('item' + num1).classList.add('winning');
    document.getElementById('item' + num2).classList.add('winning');
    document.getElementById('item' + num3).classList.add('winning');

    // Update score
    if (winner === 'x') {
        scoreX++;
    } else {
        scoreO++;
    }
    updateScoreDisplay();
    saveScores();
}

function checkDraw() {
    if (moveCount === 9 && gameActive) {
        gameActive = false;
        title.innerHTML = "🤝 It's a Draw!";
    }
}

function winners() {
    for (let i = 1; i < 10; i++) {
        square[i] = document.getElementById('item' + i).innerHTML;
    }

    // Check rows
    if (square[1] == square[2] && square[2] == square[3] && square[1] != "") {
        end(1, 2, 3, square[1]);
    }
    else if (square[4] == square[5] && square[5] == square[6] && square[4] != "") {
        end(4, 5, 6, square[4]);
    }
    else if (square[7] == square[8] && square[8] == square[9] && square[7] != "") {
        end(7, 8, 9, square[7]);
    }
    // Check columns
    else if (square[1] == square[4] && square[4] == square[7] && square[1] != "") {
        end(1, 4, 7, square[1]);
    }
    else if (square[2] == square[5] && square[5] == square[8] && square[2] != "") {
        end(2, 5, 8, square[2]);
    }
    else if (square[3] == square[6] && square[6] == square[9] && square[3] != "") {
        end(3, 6, 9, square[3]);
    }
    // Check diagonals
    else if (square[1] == square[5] && square[5] == square[9] && square[1] != "") {
        end(1, 5, 9, square[1]);
    }
    else if (square[3] == square[5] && square[5] == square[7] && square[3] != "") {
        end(3, 5, 7, square[3]);
    }
    else {
        checkDraw();
    }
}

function game(id) {
    if (!gameActive) return;

    let element = document.getElementById(id);

    if (element.innerHTML !== '') return;

    if (turn === 'x') {
        element.innerHTML = "X";
        moveCount++;
        updateMoveCount();
        turn = 'o';
        title.innerHTML = 'Player O Turn';
    }
    else if (turn === 'o') {
        element.innerHTML = "O";
        moveCount++;
        updateMoveCount();
        turn = 'x';
        title.innerHTML = 'Player X Turn';
    }

    winners();
}

function resetGame() {
    // Clear all cells
    for (let i = 1; i < 10; i++) {
        const cell = document.getElementById('item' + i);
        cell.innerHTML = '';
        cell.classList.remove('winning');
    }

    // Reset game state
    turn = 'x';
    gameActive = true;
    moveCount = 0;
    winningCells = [];
    square = [];

    updateMoveCount();
    title.innerHTML = 'Player X Turn';
}

function resetScore() {
    scoreX = 0;
    scoreO = 0;
    updateScoreDisplay();
    saveScores();
    resetGame();
}

// Initialize game
loadScores();
updateMoveCount();
