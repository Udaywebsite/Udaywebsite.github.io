class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  get value() {
    if (this.rank === 'A') {
      return 11;
    } else if (this.rank === 'K' || this.rank === 'Q' || this.rank === 'J') {
      return 10;
    } else {
      return parseInt(this.rank);
    }
  }

  toString() {
    return `${this.rank}${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
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
    return this.cards.map(card => card.toString());
  }
}



function updateHandDisplay(handElement, hand) {
  handElement.innerHTML = hand.toString().replace(/,/g, '<br>');
}

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const playerHand = new Hand();
  const dealerHand = new Hand();

  // Initial deal
  playerHand.addCard(deck.drawCard());
  playerHand.addCard(deck.drawCard());
  dealerHand.addCard(deck.drawCard());
  dealerHand.addCard(deck.drawCard());

  updateHandDisplay(document.getElementById('player-hand'), playerHand);
  updateHandDisplay(document.getElementById('dealer-hand'), dealerHand);

  const hitButton = document.getElementById('hit');
  const standButton = document.getElementById('stand');

  hitButton.addEventListener('click', () => {
    playerHand.addCard(deck.drawCard());
    updateHandDisplay(document.getElementById('player-hand'), playerHand);

    if (playerHand.getScore() > 21) {
      document.getElementById('result').innerHTML = 'Bust! You lose.';
      hitButton.disabled = true;
      standButton.disabled = true;
    }
  });

  standButton.addEventListener('click', () => {
    while (dealerHand.getScore() < 17) {
      dealerHand.addCard(deck.drawCard());
    }
    updateHandDisplay(document.getElementById('dealer-hand'), dealerHand);

    const result = document.getElementById('result');

    if (dealerHand.getScore() > 21) {
      result.innerHTML = "Dealer busts! You win.";
    } else if (playerHand.getScore() > dealerHand.getScore()) {
      result.innerHTML = "You win!";
    } else if (playerHand.getScore() < dealerHand.getScore()) {
      result.innerHTML = "You lose.";
    } else {
      result.innerHTML = "It's a tie.";
    }

    hitButton.disabled = true;
    standButton.disabled = true;
  });

  hitButton.disabled = false;
  standButton.disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');

  startButton.addEventListener('click', () => {
    startGame();
    startButton.disabled = true;
  });
});
document.addEventListener('DOMContentLoaded', () => {
  startGame();
});

