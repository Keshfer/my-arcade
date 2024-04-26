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
let deck = new Deck();
function gameStart() {
    deck.createDeck();
    deck.shuffleDeck();
    let container = document.getElementById("container");
    for(let i =0; i < 5; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < 5; j++) {
            let cardDiv = document.createElement("div");
            let card = deck.drawCard();
            cardDiv.setAttribute("data-card", card);
            let cardImg = document.createElement("img");
            cardImg.setAttribute("src", "./img/backcard.png");
            cardImg.setAttribute("height", "120px");
            cardDiv.append(cardImg)
            row.append(cardDiv);
        }
        container.append(row);
    }
}
gameStart();
