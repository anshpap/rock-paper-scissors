const delay = ms => new Promise(res => setTimeout(res, ms));

function computerPlay() {
    let randomNumber = parseInt(Math.random() * 3);     //returns 0, 1, or 2

    if (randomNumber === 0) {
        return 'rock';
    } else if (randomNumber === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function calculateRoundWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {        //Player and computer choose the same
        return 'draw';
    }

    if (playerSelection === 'rock') {                   //Player chooses rock
        if (computerSelection === 'scissors') {
            return 'player';
        } else {
            return 'computer';
        }
    } else if (playerSelection === 'paper') {           //Player chooses paper
        if (computerSelection === 'rock') {
            return 'player';
        } else {
            return 'computer';
        }
    } else {                                            //Player chooses scissors
        if (computerSelection === 'paper') {
            return 'player';
        } else {
            return 'computer';
        }
    }
}


async function animate(playerSelection, computerSelection, winner) {
    const playerWindow = document.querySelector('.player .selection-window');
    const computerWindow = document.querySelector('.computer .selection-window');

    if(document.querySelector('.player-selection-img')) document.querySelector('.player-selection-img').remove();
    if(document.querySelector('.computer-selection-img')) document.querySelector('.computer-selection-img').remove();

    const playerSelectionImg = document.createElement('img');
    playerSelectionImg.src = './images/rock.png';
    playerSelectionImg.classList.add('player-selection-img');
    playerWindow.appendChild(playerSelectionImg);

    const computerSelectionImg = document.createElement('img');
    computerSelectionImg.src = './images/rock.png';
    computerSelectionImg.classList.add('computer-selection-img');
    computerWindow.appendChild(computerSelectionImg);

    const title = [document.querySelector('.rock'), document.querySelector('.paper'), document.querySelector('.scissors')];

    await delay(1000);
    for (let i = 0; i < 3; i++) {
        playerSelectionImg.classList.add('player-down-motion');
        computerSelectionImg.classList.add('computer-down-motion');
        title[i].classList.add('title-animate');

        await delay(400);
        playerSelectionImg.classList.remove('player-down-motion');
        computerSelectionImg.classList.remove('computer-down-motion');
        title[i].classList.remove('title-animate');

        await delay(400);
    }

    playerSelectionImg.classList.add('player-down-motion');
    computerSelectionImg.classList.add('computer-down-motion');

    const shoot = document.querySelector('.shoot');
    shoot.textContent = 'Shoot!';
    shoot.classList.add('title-animate');

    await delay(125);
    playerSelectionImg.src = `./images/${playerSelection}.png`;
    computerSelectionImg.src = `./images/${computerSelection}.png`;


    shoot.classList.remove('title-animate');
    
    showResult(playerSelection, computerSelection, winner);
}

function game(e) {
    choices.forEach(choice => {
        choice.style.visibility = 'hidden';
        choice.classList.remove('hover');
    });

    resultBox.innerHTML = '<br>';
    document.querySelector('.shoot').innerHTML = '<br>';

    const playerSelection = e.currentTarget.id;
    const computerSelection = computerPlay();
    const winner = calculateRoundWinner(playerSelection, computerSelection);

    animate(playerSelection.toLowerCase(), computerSelection.toLowerCase(), winner);
}

function showResult(playerSelection, computerSelection, winner) {
    playerSelection = playerSelection.substring(0,1).toUpperCase() + playerSelection.substring(1);
    computerSelection = computerSelection.substring(0,1).toUpperCase() + computerSelection.substring(1);

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

    choices.forEach(choice => {
        choice.style.visibility = 'visible';
    });

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

    document.querySelector('.player-selection-img').remove();
    document.querySelector('.computer-selection-img').remove();

    playAgainButton.remove();

    playerScore = 0;
    computerScore = 0;
    resultBox.innerHTML = '<br>';
    scoreBox.innerHTML = `Player score: 0<br>Computer score: 0<br>`;
    document.querySelector('.shoot').innerHTML = '<br>';
}

let playerScore = 0;
let computerScore = 0;

const resultBox = document.querySelector('#result-box');
const scoreBox = document.querySelector('#score-box');
const choices = document.querySelectorAll('.choices button');
const playAgainButton = document.querySelector('#play-again button')
const allButtons = document.querySelectorAll('button');

resultBox.innerHTML = '<br>';
scoreBox.innerHTML = `Player score: 0<br>Computer score: 0<br>`;

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        choices.forEach(button => {
            button.disabled = true;
            button.style.cursor = 'default';
        });
        setInterval(() => {
            choices.forEach(button => {
                button.disabled = false;
                button.style.cursor = 'pointer';
            });
        }, 1000);
        game(e);
    });
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
    });
});