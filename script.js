console.log("Welcome to Tic Tac Toe")
const statusdispaly = document.querySelector("#status");
let gameActive = true;
let currentplayer = "X";
let gamestate = ["", "", "", "", "", "", "", "", ""];
const winmessage = () => `${currentplayer} has won!`;
const drawmessage = () => "It's a draw!";

const winlines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handlepalyerturn() {
    const p1 = document.querySelector("#player1"), p2 = document.querySelector("#player2");
    if (currentplayer === "X") {
        p1.style.background = " rgb(17, 33, 58)";
        p2.style.background = "rgb(118,44,120)";
    }
    else {
        p1.style.background = "rgb(118,44,120)";
        p2.style.background = "rgb(17, 33, 58)";
    }
}
function handleClick(event) {
    let clickedIndex = Number(event.target.getAttribute("id"));

    if (gamestate[clickedIndex] !== "" || !gameActive) return;
    gamestate[clickedIndex] = currentplayer;
    event.target.innerHTML = currentplayer;
    handlepalyerturn();
    handleResult();
}

function handleResult() {
    let roundwon = false, winline, a, b, c, i;
    for (i = 0; i < 8; ++i) {
        winline = winlines[i];
        a = gamestate[winline[0]];
        b = gamestate[winline[1]];
        c = gamestate[winline[2]];

        if (a === b && b === c && c !== "") {
            roundwon = true;
            break;
        }
    }
    if (roundwon || !gamestate.includes("")) {
        if (roundwon) {
            statusdispaly.innerHTML = winmessage();
            statusdispaly.style.color = "#139de";
            wincolors(winline);
        }
        else {
            statusdispaly.innerHTML = drawmessage();
        }
        gameActive = false;
        return;
    }
    currentplayer = currentplayer === "X" ? "O" : "X";
    handlepalyerturn();
}
function wincolors(line) {
    console.log(`${line}`);
    for (let i = 0; i < 3; ++i) {
        let cell = document.getElementById(`${line[i]}`);
        cell.style.color = "rgb(158, 7, 163)";
        cell.style.fontSize = "80px";
        statusdispaly.style.color = "black";
    }
}
function handleRestart() {
    gameActive = true;
    currentplayer = "X";
    gamestate = ["", "", "", "", "", "", "", "", ""];
    statusdispaly.innerHTML = "&nbsp";
    statusdispaly.style.color = "black";
    const p1 = document.querySelector("#player1"), p2 = document.querySelector("#player2");
    p1.style.background = " rgb(17, 33, 58)";
    p2.style.background = "rgb(118,44,120)";
    handlepalyerturn();
    document.querySelectorAll('.cell').forEach(cell =>{
        cell.innerHTML = "";
        cell.style.color = "black";
        cell.style.fontSize = "75px";
    });
}
handlepalyerturn();   
handleResult();
document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", handleClick));
document.querySelector('.restart').addEventListener('click', handleRestart);