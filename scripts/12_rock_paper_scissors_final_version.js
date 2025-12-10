// js code
// functions we need:
// 1, random generated computer move
// 2, compare user and computer move, give results
// !!! 3-2, update and display the result and score in a popup.
// 3, create a pop up saying tie, win or lose.
// use data- to define, and decouple the actual button context with the data name.
// always put global variables first, then logic(functions), then call them and connect them to the elements on html-page.

// storage layer:
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

// variables:
let computer_move = '';
const score = loadFromLocal('score', { wins: 0, losses: 0, ties: 0 });


// functions: 
function getComputerMove() {
    const random_number = Math.random();
    // Rock case, 0 ~ 1/3
    // Paper case, 1/3 ~ 2/3
    // Scissors case, 2/3 ~ 1
    let computer_move = '';
    if (random_number >= 0 && random_number < (1 / 3)) {
        computer_move = 'rock';
        // console.log('computer move is rock');
    } else if (random_number >= 1 / 3 && random_number < (2 / 3)) {
        computer_move = 'paper';
        // console.log('computer move is paper');
    } else if (random_number >= 2 / 3 && random_number < 1) {
        computer_move = 'scissors';
        // console.log('computer move is scissors');
    }
    return computer_move;
}

function compareMoves(user_move, computer_move) {
    let result = '???';

    if (user_move === computer_move) {
        result = `you both picked ${user_move}; Tie.`
        return result;
    }
    // replace it with win rules table:
    // it's an object, map to each winRules
    const winRules = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (winRules[user_move] === computer_move) {
        return `you picked ${user_move}, computer picked ${computer_move}; You win.`;
    } else {
        return `you picked ${user_move}, computer picked ${computer_move}; You lose.`;
    }
    // console.log(result);
}

function updateScores(result) {
    if (result.includes('win')) {
        score.wins++;
    } else if (result.includes('lose')) {
        score.losses++;
    } else {
        score.ties++;
    }

    // set localstorage after each updates
    // localStorage.setItem('score', JSON.stringify(score));
    saveToLocal('score', score);
}

function resetScores() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    alert("Score has been reset to 0!");
    // delete localstorage after reset to 0
    removeFromLocal('score'); // we can also put it in game logic, not inside of reset functions
    return; // nolonger go through the game logic
}

function renderScore() {
    document.getElementById('scoreboard').textContent =
        `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}


function showResultMoves(result) {
    const [moves, res = ''] = result.split(";");
    document.querySelector('.js-result').innerHTML = `
                ${res}`;
    document.querySelector('.js-moves').innerHTML = `
                ${moves}`;
}

//playgame logic to refactor code:
// the one round logic:
function playGame(user_move) {
    // get computer move
    computer_move = getComputerMove();
    // get results
    let result = compareMoves(user_move, computer_move);
    updateScores(result);
    // console.log(result);
    console.log(score);
    // we get the result it's an JS object and directly put it into innerHtml above.
    showResultMoves(result);

    // console.log(user_move);
    // console.log(computer_move);
    // so Simon use:
    document.querySelector('.js-moves2').innerHTML = `
                You pick <img src="images/10-${user_move}-emoji.png" class="move-icon"> , 
                computer picks <img src="images/10-${computer_move}-emoji.png" class="move-icon">
                `;
    renderScore();
}

// add autoplay logic:
// add a flag to stop, using clear interval id, method.
let isAutoPlaying = false;
let interval_id;
// we can make it an arrow function via remove "function" and adding "=>"
function autoPlay() {
    if (!isAutoPlaying) {
        interval_id = setInterval(function () {
            const fake_user_move = getComputerMove();
            playGame(fake_user_move);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(interval_id);
        isAutoPlaying = false;
    }
}

// binding logic event delegation ===================
// click event:
document.body.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    // only for buttons.
    if (!button) {
        return;
    }

    const action = button.dataset.action;

    if (action === 'reset') {
        resetScores();
        renderScore();
    }

    if (action === 'move') {
        // get user move
        const user_move = button.dataset.user_move;
        playGame(user_move);
    }

    if (action === 'autoplay') {
        autoPlay();
    }
}); // click event listener, end

// keydown event:
document.body.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'a') {
        autoPlay();

    } else if (key === 'r') {
        playGame('rock');

    } else if (key === 'p') {
        playGame('paper');

    } else if (key === 's') {
        playGame('scissors');
    } else if (key === 'x') {
        resetScores();
        renderScore();
    }

}); // keydown event listener, end





renderScore();