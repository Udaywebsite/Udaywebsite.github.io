class Card {
  // ...
}

class Rank {
  // ...
}

class Suit {
  // ...
}

class Deck {
  // ...
}

class Hand {
  // ...
}

function updateHandDisplay(handElement, hand) {
  handElement.innerHTML = hand.toString().replace(/,/g, '<br>');
}

function openBlackjack() {
  window.open("blackjack.html", "_blank", "width=600,height=400");
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
  dealer
