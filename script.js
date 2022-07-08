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
        return 'It\'s a draw!';
    }

    if (playerSelection === 'rock') {                   //Player chooses rock
        if (computerSelection === 'scissors') {
            return 'You win! Rock beats scissors.';
        } else {
            return 'You lose! Paper beats rock.';
        }
    } else if (playerSelection === 'paper') {           //Player chooses paper
        if (computerSelection === 'rock') {
            return 'You win! Paper beats rock.';
        } else {
            return 'You lose! Scissors beats paper.';
        }
    } else {                                            //Player chooses scissors
        if (computerSelection === 'paper') {
            return 'You win! Scissors beat paper';
        } else {
            return 'You lose! Rock beats scissors';
        }
    }
}