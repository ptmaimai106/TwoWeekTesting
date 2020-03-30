const row = document.getElementById('row');
const consecutiveSquare = document.getElementById('consecutive-square');
const buttonGenerate = document.querySelector('.generate');
const game = document.getElementById("game");
let nextPlayer = document.querySelector('.next-player');
let winner = document.querySelector('.winner');


let currentPlayer =  'X';
let isFinished = false;
let boardGame  = [];



function handleGenerate(){
    game.innerHTML= "";

    let rows = row.value;
    // let consecutiveSquares = consecutiveSquare.value;

    for(let i=0; i< rows; i++){
        let eachRow = document.createElement("div");
        for(let j=0; j<rows; j++){
            let eachSquare = document.createElement("button");
            eachSquare.classList.add("square");
            eachSquare.id = rows*i + j;
            eachRow.appendChild(eachSquare);

            eachSquare.addEventListener('click', handleClickSquare)
        }

        game.appendChild(eachRow);

    }

    for(let i=0; i< rows*rows; i++){
        boardGame.push('');
    }

    nextPlayer.innerHTML=`Next player : ${currentPlayer}`;
    winner.innerHTML = `Winner : `;
    
}

function handleClickSquare (e){
    const square = e.target;
    const squareID = parseInt(square.getAttribute('id'));
    if (this.innerHTML !== '' || isFinished) {
        return;
    }
    boardGame[squareID] = currentPlayer;
    this.innerHTML = currentPlayer;

    checkBoardGame();

   
}


function checkBoardGame() {
    if (!boardGame.includes('')   ) {
        winner.innerHTML = 'No one';
        nextPlayer.innerHTML='';
        isFinished = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    nextPlayer.innerHTML = `Next player : ${currentPlayer}`;;

}




buttonGenerate.addEventListener('click', handleGenerate);
