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
                let cardImg = "./img/Vector Cards/Single Cards (One Per File)/" + suits[i].toUpperCase() + "-" + (j+1).toString() + ".svg";
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
    let cardData = e.currentTarget.getAttribute("data-card");
    this.setAttribute("src", cardData);
    checkMatch(e);
}
function unflip() {
    firstPick.setAttribute("src", "./img/backcard.png");
    secondPick.setAttribute("src", "./img/backcard.png");
}
function checkMatch(e) {
    if(!firstPicked) {
        firstPick = e.currentTarget;
        firstPicked = true
        return
    } else {
        secondPick = e.currentTarget;
        if(firstPick.getAttribute("data-card") === secondPick.getAttribute("data-card")) {
            console.log("yay");
        } else {
            console.log("aw");
            window.setTimeout(unflip, 5000);
        }
        firstPick = ""
        secondPick = ""
        firstPicked = false;
    }
}
let cardPairs = [];
let deck = new Deck();
let firstPick;
let secondPick;
let firstPicked = false;
function gameStart() {
    deck.createDeck();
    deck.shuffleDeck();
    drawPairs();
    pairShuffle();
    let container = document.getElementById("container");
    for(let i =0; i < 4; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < 4; j++) {
            let card = cardPairs.pop();
            let cardImg = document.createElement("img");
            cardImg.setAttribute("src", "./img/backcard.png");
            cardImg.setAttribute("height", "120px");
            cardImg.setAttribute("data-card", card.getImg());
            cardImg.addEventListener("click", flip);
            row.append(cardImg);
        }
        container.append(row);
    }
}
gameStart();
