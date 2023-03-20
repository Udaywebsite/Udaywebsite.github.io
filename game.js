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
