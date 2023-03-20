function openBlackjack() {
  window.open("blackjack.html", "_blank", "width=600,height=400");
}
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');
  if (startButton) {
    startButton.addEventListener('click', () => {
      playBlackjack();
      startButton.disabled = true;
    });
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

