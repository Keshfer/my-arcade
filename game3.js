"use strict";
class Card {
    constructor(suit, rank, value, img) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
        this.img = img;
    }
    getImg() {
        return this.img.toString();
    }
}
class Deck {
    constructor() {
        this.cards = [];
    }
    createDeck() {
        let suits = ["club", "diamond", "heart", "spade"];
        let ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
        let values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
        for (let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                let cardImg = "img/Vector Cards/Single Cards (One Per File)/" + suits[i].toUpperCase() + "-" + (j+1).toString() + ".svg";
                this.cards.push(new Card(suits[i], ranks[j], values[j], cardImg));
            }
        }
    }
    shuffleDeck() {
        let card1Index;
        let card2Index;
        let tmp;
        for(let i = 0; i < this.cards.length; i++) { // should be 52 times
            // select a number from 0 to 52
            card1Index = Math.floor((Math.random() * this.cards.length));
            card2Index = Math.floor((Math.random() * this.cards.length));
            //swap cards in these locations
            tmp = this.cards[card1Index];
            this.cards[card1Index] = this.cards[card2Index];
            this.cards[card2Index] = tmp;


        }

    }
    drawCard() {
        let card = this.cards.pop();
        return card;
    }
}


function drawPairs() {
    
    for(let i = 0; i < 8; i++) {
        let card = deck.drawCard();
        let copyCard = new Card(card.suit, card.rank, card.value, card.img);
        cardPairs.push(card);
        cardPairs.push(copyCard);
    }
}
function pairShuffle() {
    let card1Index;
    let card2Index;
    let tmp;
    for(let i = 0; i < cardPairs.length; i++) {
        card1Index = Math.floor((Math.random() * cardPairs.length));
        card2Index = Math.floor((Math.random() * cardPairs.length));
        tmp = cardPairs[card1Index];
        cardPairs[card1Index] = cardPairs[card2Index];
        cardPairs[card2Index] = tmp;
    }
}
function flip(e) {
    if(!lock) {
        let cardPicked = e.currentTarget.getAttribute("data-picked");
        //console.log(cardPicked);
        if(cardPicked == "false") {
            //console.log("here now");
            e.currentTarget.setAttribute("data-picked", true);
            let cardData = e.currentTarget.getAttribute("data-card");
            this.setAttribute("src", cardData);
            checkMatch(e);
        }

    }

}
function unflip() {
    firstPick.setAttribute("src", "./img/backcard.png");
    secondPick.setAttribute("src", "./img/backcard.png");
    firstPick.setAttribute("data-picked", false);
    secondPick.setAttribute("data-picked", false);
    firstPick = ""
    secondPick = ""
    firstPicked = false;
    lock = false;
}
function checkMatch(e) {
    if(!firstPicked) {
        firstPick = e.currentTarget;
        firstPicked = true
        return
    } else {
        secondPick = e.currentTarget;
        if(firstPick.getAttribute("data-card") === secondPick.getAttribute("data-card")) {
            //console.log("yay");
            pairedCardCounter += 2;
            firstPick = ""
            secondPick = ""
            firstPicked = false;
            checkWin();

        } else {
            //console.log("aw");
            lock = true;
            window.setTimeout(unflip, 1000);
        }
    }
}
function checkWin() {
    if(pairedCardCounter == 16) {
        //console.log("win");
        //let body = document.getElementsByTagName("body");
        //let bottomContainer = document.getElementById("bottomContainer");
        let container = document.getElementById("container");
        let resultContainer = document.createElement("div");
        resultContainer.setAttribute("id", "gameResult");
        resultContainer.style.fontSize = "60px";
        resultContainer.innerText = "You Win";
        let playBtn = document.createElement("button");
        let btnText = document.createTextNode("Play again")
        playBtn.append(btnText);
        //playBtn.setAttribute("id", "playBtn");
        playBtn.addEventListener("click", function() {
            resultContainer.innerHTML = "";
            gameStart();
        })
        resultContainer.append(playBtn);
        container.append(resultContainer);
        lock = true;
    }
}
let exitBtn = document.getElementById("exitBtn");
exitBtn.addEventListener("click", function() {
    window.location.href = "index.html";
});
let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", function() {
    gameStart();
})
document.addEventListener("keydown", function(e) {
    if(e.key === "r") {
        gameStart();
    } else if(e.key === "e") {
        window.location.href = "index.html";
    }
})

let cardPairs = [];
let deck = new Deck();
let firstPick;
let secondPick;
let firstPicked = false;
let lock = false;
let pairedCardCounter =0;
function gameStart() {
    deck.createDeck();
    deck.shuffleDeck();
    drawPairs();
    pairShuffle();
    pairedCardCounter = 0;
    firstPicked = false;
    lock = false;
    let container = document.getElementById("container");
    container.innerHTML="";
    for(let i =0; i < 4; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < 4; j++) {
            let card = cardPairs.pop();
            let cardImg = document.createElement("img");
            cardImg.setAttribute("src", "./img/backcard.png");
            //cardImg.setAttribute("height", "120px");
            cardImg.setAttribute("class", "cardHeight");
            cardImg.setAttribute("data-card", card.getImg());
            cardImg.setAttribute("data-picked", false);
            cardImg.addEventListener("click", flip);
            row.append(cardImg);
        }
        container.append(row);
    }
}
gameStart();


