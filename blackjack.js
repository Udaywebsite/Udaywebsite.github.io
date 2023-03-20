function openBlackjack() {
  window.open("blackjack.html", "_blank", "width=600,height=400");
}
document.addEventListener('DOMContentLoaded', () => {
  const playBlackjackButton = document.getElementById('playBlackjack');
  if (playBlackjackButton) {
    playBlackjackButton.addEventListener('click', openBlackjack);
  }
});


function playBlackjack() {
  const startButton = document.getElementById('start');

  startButton.addEventListener('click', () => {
    // Call the game logic function from the new "game.js" file
    startGame();
    startButton.disabled = true;
  });
}

