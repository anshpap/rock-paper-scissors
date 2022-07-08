function computerPlay() {
    let randomNumber = parseInt(Math.random() * 3);    //returns 0, 1, or 2
    if (randomNumber === 0) {
        return 'rock';
    } else if (randomNumber === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}