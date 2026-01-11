// js code
// functions we need:
// 1, random generated computer move
// 2, compare user and computer move, give results
// !!! 3-2, update and display the result and score in a popup.
// 3, create a pop up saying tie, win or lose.
// use data- to define, and decouple the actual button context with the data name.
// always put global variables first, then logic(functions), then call them and connect them to the elements on html-page.

// =================== Storage Layer ===================
function saveToLocal(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

function loadFromLocal(key, defaultValue = {}) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromLocal(key) {
    localStorage.removeItem(key);
}

// =================== State Layer ===================
let computer_move = '';

const score = loadFromLocal('score', {
    wins: 0,
    losses: 0,
    ties: 0
});

let isAutoPlaying = false;
let interval_id;

// selecting UI variable, action/move
let selectedButton = null;

// =================== Logic Layer (Pure Logic) ===================
function getComputerMove() {
    const random_number = Math.random();

    if (random_number < 1 / 3) return 'rock';
    if (random_number < 2 / 3) return 'paper';
    return 'scissors';
}

function compareMoves(user_move, computer_move) {
    if (user_move === computer_move) {
        return `you both picked ${user_move}; Tie.`;
    }

    const winRules = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (winRules[user_move] === computer_move) {
        return `you picked ${user_move}, computer picked ${computer_move}; You win.`;
    }
    return `you picked ${user_move}, computer picked ${computer_move}; You lose.`;
}

function updateScores(result) {
    if (result.includes('win')) {
        score.wins++;
    } else if (result.includes('lose')) {
        score.losses++;
    } else {
        score.ties++;
    }
    saveToLocal('score', score);
}

function resetScores() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    // alert("Score has been reset to 0!");
    removeFromLocal('score');
}

// =================== UI Render Layer ===================

// update UI
function updateSelectedButtonUI(button) {
    document.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("active");
    });
    if (button) {
        button.classList.add("active");
    }
}

function renderScore() {
    document.getElementById('scoreboard').textContent =
        `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

function showResultMoves(result) {
    const [moves, res = ''] = result.split(";");

    document.querySelector('.js-result').innerHTML = `${res}`;
    document.querySelector('.js-moves').innerHTML = `${moves}`;
}

function renderMovesIcons(user_move, computer_move) {
    document.querySelector('.js-moves2').innerHTML = `
        You pick <img src="images/10-${user_move}-emoji.png" class="move-icon"> ,
        computer picks <img src="images/10-${computer_move}-emoji.png" class="move-icon">
    `;
}

// double check if reset:
function doubleCheckReset() {
    const confirmBox = document.querySelector('.js-double-check-reset-grid');
    confirmBox.classList.remove('hidden');
}

function hideResetConfirm() {
    document.querySelector('.js-double-check-reset-grid')
        .classList.add('hidden');
}

// =================== Game Controller ===================
function playGame(user_move) {
    computer_move = getComputerMove();

    const result = compareMoves(user_move, computer_move);
    updateScores(result);

    showResultMoves(result);
    renderMovesIcons(user_move, computer_move);
    renderScore();

    console.log(score);
}

function autoPlay() {
    if (!isAutoPlaying) {
        interval_id = setInterval(() => {
            const fake_user_move = getComputerMove();
            playGame(fake_user_move);
        }, 1000);

        isAutoPlaying = true;
        // adding stop playing text.
        document.querySelector('.js-autoplay-btn').innerText = `Stop Playing`
    } else {
        clearInterval(interval_id);
        isAutoPlaying = false;
        document.querySelector('.js-autoplay-btn').innerText = `Auto Play`
    }
}

// handle UI together
function handleButton(button) {
    if (!button) return;

    selectedButton = button;
    updateSelectedButtonUI(button);

    const action = button.dataset.action;
    const move = button.dataset.user_move;

    if (action === "autoplay") autoPlay();
    else if (action === "reset") {
        doubleCheckReset();
        // do that after confirm.
        // resetScores();
        // renderScore();
    }
    else if (move) {
        playGame(move);
    }

    // new logic for confirm
    if (button.classList.contains('js-reset-yes')) {
        resetScores();
        renderScore();
        hideResetConfirm();
    }
    else if (button.classList.contains('js-reset-no')) {
        hideResetConfirm();
    }
}

// =================== Input Layer ===================

// --- Mouse ---
document.body.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    handleButton(button);
});

// --- Keyboard ---
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === "r") {
        const btn = document.querySelector('[data-user_move="rock"]');
        handleButton(btn);
    }
    else if (key === "p") {
        const btn = document.querySelector('[data-user_move="paper"]');
        handleButton(btn);
    }
    else if (key === "s") {
        const btn = document.querySelector('[data-user_move="scissors"]');
        handleButton(btn);
    }
    else if (key === "a") {
        const btn = document.querySelector('[data-action="autoplay"]');
        handleButton(btn);
    }
    else if (key === "x") {
        const btn = document.querySelector('[data-action="reset"]');
        handleButton(btn);
    }else if (key === "y") {
        const btn = document.querySelector('[data-action="reset-y"]');
        handleButton(btn);
    }else if (key === "n") {
        const btn = document.querySelector('[data-action="reset-n"]');
        handleButton(btn);
    }

});

// =================== Initialization ===================
renderScore();
