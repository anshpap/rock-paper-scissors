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

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {        //Player and computer choose the same
        return 'draw';
    }

    if (playerSelection === 'rock') {                   //Player chooses rock
        if (computerSelection === 'scissors') {
            return 'player wins';
        } else {
            return 'computer wins';
        }
    } else if (playerSelection === 'paper') {           //Player chooses paper
        if (computerSelection === 'rock') {
            return 'player wins';
        } else {
            return 'computer wins';
        }
    } else {                                            //Player chooses scissors
        if (computerSelection === 'paper') {
            return 'player wins';
        } else {
            return 'computer wins';
        }
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt('Enter your choice');
        playerSelection = playerSelection.toLowerCase();
        let computerSelection = computerPlay();
        let result = playRound(playerSelection, computerSelection);

        if (result === 'player wins') {
            playerScore++;
            console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
        } else if (result === 'computer wins') {
            computerScore++;
            console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
        } else {
            console.log(`It's a draw! You both selected ${playerSelection}`);
        }
        console.log(`Your score: ${playerScore}`);
        console.log(`Computer's score: ${computerScore}`);
    }

    declareWinner(playerScore, computerScore);
}

function declareWinner(playerScore, computerScore) {
    if (playerScore > computerScore) {
        console.log('You won the game!');
    } else if (computerScore > playerScore) {
        console.log('You lost the game!');
    } else {
        console.log('It\'s a draw!');
    }
}

game();