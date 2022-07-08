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
    playerSelection = playerSelection.toLowerCase();

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

