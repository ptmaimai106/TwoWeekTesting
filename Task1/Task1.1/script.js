const squares = Array.from(document.querySelectorAll('.square'));
const resetButton = document.querySelector('.reset');
let nextPlayer = document.querySelector('.next-player');
let winner = document.querySelector('.winner');

let currentPlayer = 'X';
let boardGame = ['','','','','','','','',''];
let isFinished = false;


const winningResult = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleResetGame(){
    squares.forEach(square => square.innerHTML = "");
    currentPlayer = "X";
    nextPlayer.innerHTML = currentPlayer;
    winner.innerHTML= '';
    isFinished = false;
    boardGame = ['','','','','','','','',''];
}

function handleClickSquare(e){
    const square = e.target;
    const squareID = parseInt(square.getAttribute('id'));
    if (boardGame[squareID] !== "" || isFinished) {
        return;
    }
    boardGame[squareID] = currentPlayer;
    square.innerHTML = currentPlayer;
    checkBoardGame();

}

function checkBoardGame() {
    let finish = false;

   

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningResult[i];

        let a = boardGame[winCondition[0]];
        let b = boardGame[winCondition[1]];
        let c = boardGame[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            finish = true;
            break
        }
    }

    if (finish) {
        winner.innerHTML=currentPlayer;
        nextPlayer.innerHTML ='';
        isFinished = true;
        return;
    }

    if (!boardGame.includes('')) {
        winner.innerHTML = 'No one';
        nextPlayer.innerHTML='';
        isFinished = true;
        return;
    }

    

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    nextPlayer.innerHTML = currentPlayer;

}



squares.forEach(button => button.addEventListener('click', handleClickSquare))
resetButton.addEventListener('click', handleResetGame);

