

let game1Button = document.getElementById("game1");
let game2Button = document.getElementById("game2");
let game3Button = document.getElementById("game3");
let instrcutButton = document.getElementById("instructButton");

if(game1Button) { 
    game1Button.addEventListener("click", startGame1);
}
game2Button.addEventListener("click", startGame2);
game3Button.addEventListener("click", startGame3);
instructButton.addEventListener("click", instruct);

function startGame1() {
    window.location.href = "game1.html";
}
function startGame2() {
    window.location.href = "game2.html";
}
function startGame3() {
    window.location.href = "game3.html";
}
function instruct() {
    window.location.href = "instructions.html";
}