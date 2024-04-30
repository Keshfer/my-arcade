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

let playerCards = [];
let player11Aces = 0;
let dealerCards = [];
let dealer11Aces = 0;
let playerTurn = true;
let sum = 0;
let deck;
//checks if starting hand for player is a bust
function checkStarterBust() {
    for(let i = 0; i < playerCards.length; i++) {
        sum += playerCards[i].value;
    }
    while(sum > 21 && player11Aces > 0) {
        sum -= 10;
        player11Aces -= 1;
    }
    if(sum > 21) {
        dealerWins(true);
        //console.log("bust");
    }

}
function checkBust(cardVal) {
    sum += cardVal;
    while(sum > 21 && player11Aces > 0) {
        sum -= 10;
        player11Aces -= 1;
    }
    if(sum > 21) {
        playerTurn = false;
        resultWindow(true);
        //console.log("bust");
    }


}
//dealer keeps drawing cards until the card values are bigger than the player's or bust occurs
function dealerWins() {
    let dealerSum = 0;
    let revealCard = dealerCards[0]; //hidden card is always in 0 index
    let revealCardImg = document.getElementById("hiddenCard");

    revealCardImg.setAttribute("src", revealCard.getImg());
    for(let i = 0; i < dealerCards.length; i++) {
        dealerSum += dealerCards[i].value;
    }
    if(dealerSum > sum && dealerSum <= 21) {
        return true;
    }
    while(dealerSum < 21) {
        let drawnCard = deck.drawCard();
        if(drawnCard.rank =="ace") {
            dealer11Aces += 1;
        }
        let drawnCardImg = document.createElement("img");
        drawnCardImg.setAttribute("src", drawnCard.getImg());
        //drawnCardImg.setAttribute("height", "120px");
        drawnCardImg.setAttribute("class", "cardHeight");

        let dealerContainer = document.getElementById("dealerContainer");
        dealerContainer.append(drawnCardImg);
        
        dealerCards.push(drawnCard);
        dealerSum += drawnCard.value;
        while(dealerSum > 21 && dealer11Aces > 0) {
            dealerSum -= 10;
            dealer11Aces -= 1;
        }
        if(dealerSum > sum && dealerSum <= 21) {
            return true;
        }
    }
    return false;
    
}
function hit() {
    if(playerTurn) {
        let cardImage = document.createElement("img");
        let playerContainer = document.getElementById("playerContainer");
        let card = deck.drawCard();
        if(card.rank == "ace") {
            player11Aces += 1;
        }
        cardImage.setAttribute("src", card.getImg());
        //cardImage.setAttribute("height", "120px");
        cardImage.setAttribute("class", "cardHeight");
        playerContainer.append(cardImage);
        playerCards.push(card);
        checkBust(card.value);
    }
}
function stand() {
    playerTurn = false;
    resultWindow(dealerWins())
}
function resultWindow(result) {
    let bodyContainer = document.getElementsByTagName("body");
    let resultContainer = document.createElement("div");
    resultContainer.setAttribute("id", "gameResult");
    resultContainer.style.fontSize = "60px";

    let playBtn = document.createElement("button");
    let btnText = document.createTextNode("Play again")
    playBtn.append(btnText);
    playBtn.setAttribute("id", "playBtn");
    //playBtn.innerText = "Play again";
    playBtn.addEventListener("click", function() {
        resultContainer.innerHTML = "";
        gameStart();
    })

    //let words = document.createElement("")
    if(result) {
        //console.log("lose");
        resultContainer.style.color = "red";
        resultContainer.innerText = "You Lose";
    } else {
        //console.log("win");
        resultContainer.style.color = "blue";
        resultContainer.innerText = "You Win";
    }
    resultContainer.append(playBtn);
    bodyContainer[0].append(resultContainer);
    

}
//erases previous stored game data and sets up the dealer and player with new cards
function gameStart() {
    /*set up*/
    playerCards = [];
    player11Aces = 0;
    dealerCards = [];
    dealer11Aces = 0;
    playerTurn = true;
    sum = 0;
    deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();
    let dealerContainer = document.getElementById("dealerContainer");
    let playerContainer = document.getElementById("playerContainer");
    dealerContainer.innerHTML = "";
    playerContainer.innerHTML = "";
    let card = deck.drawCard();
    if(card.rank == "ace") {
        dealer11Aces += 1;
    }
    let hiddenCard = deck.drawCard();
    if(hiddenCard.rank == "ace") {
        dealer11Aces += 1;
    }
    let cardImage = document.createElement("img");
    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.setAttribute("id", "hiddenCard");

    /*dealer starter cards*/
    hiddenCardImg.setAttribute("src", "./img/backcard.png");
    //hiddenCardImg.setAttribute("height", "120px");
    hiddenCardImg.setAttribute("class", "cardHeight");
    cardImage.setAttribute("src", card.getImg());
    //cardImage.setAttribute("height", "120px");
    cardImage.setAttribute("class", "cardHeight");
    dealerContainer.append(hiddenCardImg);
    dealerContainer.append(cardImage);
    dealerCards.push(hiddenCard);
    dealerCards.push(card);

    /*Player starter cards*/
    for(let i = 0; i < 2; i++) {
        let pCard = deck.drawCard();
        if(pCard.rank == "ace") {
            player11Aces += 1;
        }
        let pCardImage = document.createElement("img");
        pCardImage.setAttribute("src", pCard.getImg());
        //pCardImage.setAttribute("height", "120px");
        pCardImage.setAttribute("class", "cardHeight");
        playerContainer.append(pCardImage);
        playerCards.push(pCard);

        
    }

    //game begins
    checkStarterBust();



}

let hitBtn = document.getElementById("hitBtn");
hitBtn.addEventListener("click", function() {
    hit();
})
let standBtn = document.getElementById("standBtn");
standBtn.addEventListener("click", function() {
    if(playerTurn) {
        stand();
    } 
    
}) 
let exitBtn = document.getElementById("exit");
exitBtn.addEventListener("click", function() {
    window.location.href = "index.html";
})
let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", gameStart);
document.addEventListener("keydown", function(e) {
    if(e.key === "e") {
        window.location.href = "index.html"
    } else if(e.key === "r") {
        gameStart();
    } else if(e.key === "h") {
        hit();
    } else if(e.key === "s") {
        stand();
    }
})
gameStart();