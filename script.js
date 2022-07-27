const delay = ms => new Promise(res => setTimeout(res, ms));

function computerPlay() {
    let randomNumber = parseInt(Math.random() * 3);     //returns 0, 1, or 2

    if (randomNumber === 0) {
        return 'Rock';
    } else if (randomNumber === 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function calculateRoundWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {        //Player and computer choose the same
        return 'draw';
    }

    if (playerSelection === 'Rock') {                   //Player chooses rock
        if (computerSelection === 'Scissors') {
            return 'player';
        } else {
            return 'computer';
        }
    } else if (playerSelection === 'Paper') {           //Player chooses paper
        if (computerSelection === 'Rock') {
            return 'player';
        } else {
            return 'computer';
        }
    } else {                                            //Player chooses scissors
        if (computerSelection === 'Paper') {
            return 'player';
        } else {
            return 'computer';
        }
    }
}


async function animate(playerSelection, computerSelection, winner) {
    const playerWindow = document.querySelector('.player .selection-window');
    const computerWindow = document.querySelector('.computer .selection-window');

    playerSelectionImg = document.createElement('img');
    playerSelectionImg.src = './images/rock.png';
    playerSelectionImg.classList.add('player-default-rock');
    playerWindow.appendChild(playerSelectionImg);

    await delay(1000);
    for (let i = 0; i < 3; i++) {
        playerSelectionImg.classList.add('down-motion');
        await delay(400);
        playerSelectionImg.classList.remove('down-motion');
        await delay(400);
    }

    playerSelectionImg.classList.add('down-motion');
    await delay(125);
    playerSelectionImg.src = `./images/${playerSelection}.png`;
}

function game(e) {
    const playerSelection = e.currentTarget.id.substring(0,1).toUpperCase() + e.currentTarget.id.substring(1);
    const computerSelection = computerPlay();
    const winner = calculateRoundWinner(playerSelection, computerSelection);

    animate(playerSelection.toLowerCase(), computerSelection.toLowerCase(), winner);

    if (winner === 'player') {
        playerScore++;
        resultBox.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    } else if (winner === 'computer') {
        computerScore++;
        resultBox.textContent = `You lose! ${computerSelection} beats ${playerSelection}.`;
    } else {
        resultBox.textContent = `It\'s a draw! You both chose ${playerSelection}.`;
    }

    scoreBox.innerHTML = `Player score: ${playerScore}<br>Computer score: ${computerScore}<br>`;

    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function endGame() {
    if (playerScore > computerScore) {
        resultBox.textContent = 'You won the game!';
    } else {
        resultBox.textContent = 'You lost the game!';
    }

    choices.forEach(choice => {
        choice.classList.remove('hover');
        choice.remove();
    });

    playAgainButton.classList.remove('hover');
    document.querySelector('#play-again').appendChild(playAgainButton);
}

function restartGame() {
    choices.forEach(choice => {
        document.querySelector('.choices').appendChild(choice);
    });

    playAgainButton.remove();

    playerScore = 0;
    computerScore = 0;
    resultBox.innerHTML = '';
    scoreBox.innerHTML = '';
}

let playerScore = 0;
let computerScore = 0;

const resultBox = document.querySelector('#result-box');
const scoreBox = document.querySelector('#score-box');
const choices = document.querySelectorAll('.choices button');
const playAgainButton = document.querySelector('#play-again button')
const allButtons = document.querySelectorAll('button');

choices.forEach(choice => {
    choice.addEventListener('click', game);
    choice.style.cursor = 'pointer';
});

playAgainButton.remove();
playAgainButton.addEventListener('click', () => {
    setTimeout(restartGame, 200);
});

allButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.classList.add('hover');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('hover');
        button.classList.remove('clicked');
    });
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 80);
    });
});