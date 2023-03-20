function openBlackjack() {
  window.open("blackjack.html", "_blank", "width=600,height=400");
}

function playBlackjack() {
  const startButton = document.getElementById('start');

  startButton.addEventListener('click', () => {
    // Call the game logic function from the new "game.js" file
    startGame();
    startButton.disabled = true;
  });
}

