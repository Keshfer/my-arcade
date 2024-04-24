class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}
class Deck {
    constructor() {
        this.cards = [];
    }
    createDeck() {
        let suits = ["clubs", "diamonds", "hearts", "spades"];
        let ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
        for (let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], j));
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
}


let hitBtn = document.getElementById("hitBtn");
hitBtn.addEventListener("click", function() {
    let cardImage = document.createElement("img");
    let playerContainer = document.getElementById("playerContainer");
    cardImage.setAttribute("src", "./img/Vector Cards/FACES (BORDERED)/STANDARD BORDERED/Single Cards (One Per File)/CLUB-1.svg");
    /*cardImage.setAttribute("width", "50px");*/
    cardImage.setAttribute("height", "90px");
    playerContainer.append(cardImage);
})