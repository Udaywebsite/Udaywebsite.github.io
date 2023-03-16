class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getValue() {
    return this.rank.getValue();
  }
}

class Rank {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

class Suit {
  constructor(name) {
    this.name = name;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.suits = [
      new Suit('HEARTS'),
      new Suit('DIAMONDS'),
      new Suit('CLUBS'),
      new Suit('SPADES'),
    ];
    this.ranks = [
      new Rank('ACE', 1),
      new Rank('TWO', 2),
      new Rank('THREE', 3),
      new Rank('FOUR', 4),
      new Rank('FIVE', 5),
      new Rank('SIX', 6),
      new Rank('SEVEN', 7),
      new Rank('EIGHT', 8),
      new Rank('NINE', 9),
      new Rank('TEN', 10),
      new Rank('JACK', 10),
      new Rank('QUEEN', 10),
      new Rank('KING', 10),
    ];

    for (const suit of this.suits) {
      for (const rank of this.ranks) {
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

  getCards() {
    return this.cards;
  }

  getScore() {
    let score = 0;
    let aceCount = 0;
    for (const card of this.cards) {
      score += card.getValue();
      if (card.rank.name === 'ACE') {
        aceCount++;
      }
    }

    // Handle Aces
    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  toString() {
    return this.cards.map(card => `${card.rank.name} of ${card.suit.name}`).join(', ');
  }
}

function playBlackjack() {
  const deck = new Deck();
  deck.shuffle();

  const playerHand = new Hand();
  const dealerHand = new Hand();

  // Initial deal
  playerHand.addCard(deck.drawCard());
  playerHand.addCard(deck.drawCard());
  dealerHand.addCard(deck.drawCard());
  dealerHand.addCard(deck.drawCard());

  // ...
}


function updateHandDisplay(handElement, hand) {
  handElement.innerHTML = hand.toString().replace(/,/g, '<br>');
}

// Get the modal
var modal = document.getElementById("blackjackModal");

// Get the button that opens the modal
var btn = document.getElementById("playBlackjack");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function playBlackjack() {
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

document
