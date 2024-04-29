

let game1Button = document.getElementById("game1");
let game2Button = document.getElementById("game2");
let game3Button = document.getElementById("game3");
let instrcutButton = document.getElementById("instructButton");


game1Button.addEventListener("click", startGame1);
document.addEventListener("keydown", function(e) {
    if(e.key === "1") {
        window.location.href = "game1.html";
    }
})
game2Button.addEventListener("click", startGame2);
document.addEventListener("keydown", function(e) {
    if(e.key === "2") {
        window.location.href = "game2.html";
    }
})
game3Button.addEventListener("click", startGame3);
document.addEventListener("keydown", function(e) {
    if(e.key === "3") {
        window.location.href = "game3.html";
    }
})
instructButton.addEventListener("click", instruct);
document.addEventListener("keydown", function(e) {
    if(e.key === "i") {
        window.location.href = "instructions.html";
    }
})

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