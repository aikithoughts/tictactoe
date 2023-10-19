let playerTurn = "x";
let moves = 0;
let isGameOver = false;
let span = document.getElementsByTagName("span");
let restartButton = createRestartButton();


function play(y){
    if(y.dataset.player == "none" && isGameOver == false) { // if the current span element is empty and the game is ongoing!
        y.innerHTML = playerTurn; // set the value of the span to either X or O.
        y.dataset.player = playerTurn; // used to check win conditions.
        moves++; // increment the move counter;
        if (playerTurn == "x") {
            playerTurn = "o";
        } else if (playerTurn == "o") { // Not sure why we can't just use an else statement here.
            playerTurn = "x" 
        }
    }

    /* Win conditions */
    checkWinner(1, 2, 3);
    checkWinner(4, 5, 6);
    checkWinner(7, 8, 9);
    checkWinner(2, 5, 8);
    checkWinner(1, 4, 7);
    checkWinner(3, 6, 9);
    checkWinner(1, 5, 9);
    checkWinner(7, 5, 3);

    if (moves == 9 && isGameOver == false) {
        draw();
    }
}

function checkWinner(a, b, c) {
    // align values to index values.
    a--;
    b--;
    c--;
    const playerMatch = (span[a].dataset.player === span[b].dataset.player) && 
                        (span[b].dataset.player === span[c].dataset.player) 
    if (playerMatch && span[a].dataset.player !== "none" && isGameOver == false) {
        // highlight the winning squares!
        [a, b, c].forEach(index => span[index].parentNode.classList.add("activeBox"));
        gameOver(a);
    }
}

function gameOver(a) {
    let gameOverAlertElement = `<b>GAME OVER </b>
                                <br>
                                <br>
                                 Player ${span[a].dataset.player.toUpperCase() } + Wins!!!
                                <br>
                                <br>
                                ${restartButton}`;
    let div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = gameOverAlertElement;
    document.appendChild(div);
    isGameOver = true;
    moves = 0;
}

function playAgain() {
    const alertElement = document.querySelector(".alert");
    const elementsWithActiveBox = document.querySelectorAll("activeBox");
    if (alertElement) {
        alertElement.remove();
    }
    resetGame();
    isGameOver = false;
    elementsWithActiveBox.forEach(element => {
        element.classList.remove("activeBox");
    });
}

function resetGame(){
    for (i = 0; i < span.length; i++ ) {
        span[i].dataset.player = "none";
        span[i].innerHTML = "&nbsp;";
    }
    playerTurn = "x";
}

function draw() {
    let drawAlertElement = `<b>DRAW!!</b>
                            <br>
                            <br>
                            ${restartButton}`
    let div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = drawAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    isGameOver = true;
    moves = 0;
}

function gameOverElement() {
    
}

function createRestartButton() {
    const button = document.createElement("button");
    button.addEventListener("click", playAgain);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "30");
    svg.setAttribute("height", "30");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-arrow-repeat");
    svg.setAttribute("viewBox", "0 0 16 16");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z");
    
    button.appendChild(svg);
    svg.appendChild(path);
    
    return button;
}

