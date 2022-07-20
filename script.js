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

function game(e) {
    const playerSelection = e.target.id.substring(0,1).toUpperCase() + e.target.id.substring(1);
    const computerSelection = computerPlay();
    const winner = calculateRoundWinner(playerSelection, computerSelection);

    if (winner === 'player') {
        playerScore++;
        resultBox.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    } else if (winner === 'computer') {
        computerScore++;
        resultBox.textContent = `You lose! ${computerSelection} beats ${playerSelection}.`;
    } else {
        resultBox.textContent = `It\'s a draw! You both chose ${playerSelection}`;
    }

    scoreBox.innerHTML = `Player score: ${playerScore}<br>Computer score: ${computerScore}<br>`;

    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function endGame() {
    choices.forEach(choice => {
        choice.removeEventListener('click', game);
        choice.disabled = true;
    });

    const playAgain = document.createElement('button');
    playAgain.setAttribute('id', 'play-again');
    playAgain.textContent = 'Play Again';
    playAgain.addEventListener('click', restartGame);

    document.body.appendChild(playAgain);
}

function restartGame() {
    choices.forEach(choice => {
        choice.addEventListener('click', game);
        choice.disabled = false;
    });

    document.querySelector('#play-again').remove();

    playerScore = 0;
    computerScore = 0;
    resultBox.innerHTML = '';
    scoreBox.innerHTML = '';
}

let playerScore = 0;
let computerScore = 0;

const resultBox = document.querySelector('#result-box');
const scoreBox = document.querySelector('#score-box');
const choices = document.querySelectorAll('button');

choices.forEach(choice => {
    choice.addEventListener('click', game);
});

// function game() {
//     let playerScore = 0;
//     let computerScore = 0;

//     for (let i = 0; i < 5; i++) {
//         let playerSelection = prompt('Enter your choice');
//         playerSelection = playerSelection.toLowerCase();
//         let computerSelection = computerPlay();
//         let result = playRound(playerSelection, computerSelection);

//         if (result === 'player wins') {
//             playerScore++;
//             console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
//         } else if (result === 'computer wins') {
//             computerScore++;
//             console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
//         } else {
//             console.log(`It's a draw! You both selected ${playerSelection}`);
//         }
//         console.log(`Your score: ${playerScore}`);
//         console.log(`Computer's score: ${computerScore}`);
//     }

//     declareWinner(playerScore, computerScore);
// }

// function declareWinner(playerScore, computerScore) {
//     if (playerScore > computerScore) {
//         console.log('You won the game!');
//     } else if (computerScore > playerScore) {
//         console.log('You lost the game!');
//     } else {
//         console.log('It\'s a draw!');
//     }
// }

// game();