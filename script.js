function computerPlay() {
    let randomNumber = parseInt(Math.random() * 3);    //returns 0, 1, or 2
    if (randomNumber === 0) {
        return 'Rock';
    } else if (randomNumber === 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}