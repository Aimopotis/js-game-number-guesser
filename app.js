/*
GAME Functions
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify the player of guesses remaining
- Notify the player of the correct answer if loose
- Let the player choose to play again
*/

// Game values
let min = 1,
  max = 5,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;
// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  // Validate Input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true);
  } else {
    // Wrong Number
    guessesLeft--;
    if (guessesLeft === 0) {
      // Game Over - lost
      gameOver(false);
    } else {
      // Game continue - answer wrong
      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left`,
        'orange'
      );
    }
  }

  // Clear Input
  guessInput.value = '';
});

function gameOver(won) {
  let color;
  let msg;
  won
    ? ((color = 'green'), (msg = `${winningNum} is correct! YOU WIN`))
    : ((color = 'red'),
      (msg = `You have lost, the correct Number was ${winningNum}, ${guessesLeft} guesses left`));

  // Disable Input
  guessInput.disabled = won;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg, color);

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get Random Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//END
