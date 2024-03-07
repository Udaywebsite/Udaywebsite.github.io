document.addEventListener('DOMContentLoaded', () => {

  class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }

    get value() {
      if (this.rank === 'A') {
        return 11;
      } else if (['K', 'Q', 'J'].includes(this.rank)) {
        return 10;
      } else {
        return parseInt(this.rank, 10);
      }
    }

    toString() {
      return `${this.rank}${this.suit}`;
    }
  }

  class Deck {
    constructor() {
      this.cards = [];
      this.initialize();
    }

    initialize() {
      this.cards = [];
      const suits = ['♠', '♣', '♥', '♦'];
      const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      for (let suit of suits) {
        for (let rank of ranks) {
          this.cards.push(new Card(rank, suit));
        }
      }
      this.shuffle();
    }

    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }

    drawCard() {
      return this.cards.pop();
    }
  }

  class Hand {
    constructor() {
      this.cards = [];
    }

    addCard(card) {
      this.cards.push(card);
    }

    getScore() {
      let score = 0;
      let aces = 0;
      for (let card of this.cards) {
        score += card.value;
        if (card.rank === 'A') {
          aces++;
        }
      }
      while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
      }
      return score;
    }

    toString() {
      return this.cards.map(card => card.toString()).join('<br>');
    }
  }

  // Initialize game state variables
  let playerHand = new Hand();
  let dealerHand = new Hand();
  const deck = new Deck();

  function updateHandDisplay(handElement, hand) {
    handElement.innerHTML = hand.toString();
  }

  function startGame() {
    deck.initialize(); // Reinitialize the deck

    playerHand = new Hand(); // Reset player's hand
    dealerHand = new Hand(); // Reset dealer's hand

    // Initial deal
    playerHand.addCard(deck.drawCard());
    playerHand.addCard(deck.drawCard());
    dealerHand.addCard(deck.drawCard());
    dealerHand.addCard(deck.drawCard());

    updateHandDisplay(document.getElementById('player-hand'), playerHand);
    updateHandDisplay(document.getElementById('dealer-hand'), dealerHand);

    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
    document.getElementById('result').innerHTML = ''; // Clear any previous result
    document.getElementById('start').disabled = true; // Disable start button after game starts
  }

  // Event listeners for game controls
  document.getElementById('start').addEventListener('click', startGame);

  document.getElementById('hit').addEventListener('click', () => {
    playerHand.addCard(deck.drawCard());
    updateHandDisplay(document.getElementById('player-hand'), playerHand);

    if (playerHand.getScore() > 21) {
      document.getElementById('result').innerHTML = 'Bust! You lose.';
      document.getElementById('hit').disabled = true;
      document.getElementById('stand').disabled = true;
      document.getElementById('start').disabled = false; // Re-enable start button
    }
  });

  document.getElementById('stand').addEventListener('click', () => {
    while (dealerHand.getScore() < 17) {
      dealerHand.addCard(deck.drawCard());
    }
    updateHandDisplay(document.getElementById('dealer-hand'), dealerHand);

    const playerScore = playerHand.getScore();
    const dealerScore = dealerHand.getScore();
    let resultText = '';

    if (dealerScore > 21) {
      resultText = "Dealer busts! You win.";
    } else if (playerScore > dealerScore) {
      resultText = "You win!";
    } else if (playerScore < dealerScore) {
      resultText = "You lose.";
    } else {
      resultText = "It's a tie.";
    }

    document.getElementById('result').innerHTML = resultText;
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('start').disabled = false; // Re-enable start button to allow a new game
  });

});
