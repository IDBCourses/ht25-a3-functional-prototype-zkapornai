// Your "consol"/ the square what you manage
const squareEl = document.getElementById('square');
let square = { x: 600, y: 620, speed: 5, colour: 0, size: 100, rotation: 0 };

// Falling blocks and some variables for statements down below for the letters.
let block = document.createElement('div');
block.classList.add('fallingBlock');
document.body.appendChild(block);
let blockY = 0;

let fallCount = 0;
let gameOver = false;
let jPressed = false;
let lPressed = false;
let bAnimations = false;

// setup: starting the game
function setup() {
  loop();
}

// loop: Runs over and over again in every screen pixel.
function loop() {
  if (gameOver) return;

  // L es J handling for moving smooth. if J is pressed, the square starts moving to right, else l pressed it is moving to left
  if (jPressed) square.x -= square.speed;
  if (lPressed) square.x += square.speed;

  // Animations when pressing b. When b is pressed its chagning colour and starts to shrink.
  if (bAnimations) {
    square.colour += 10;
    square.size -= 0.5;
  }

  // JPlayers square moving set up
  squareEl.style.left = square.x + 'px';
  squareEl.style.top = square.y + 'px';
  squareEl.style.width = square.size + 'px';
  squareEl.style.height = square.size + 'px';
  squareEl.style.backgroundColor = 'rgb(' + square.colour + ',0,0)';

  // The block moving down setups for speed and direction
  blockY += 8;
  block.style.top = blockY + 'px';

  // If its in the bottom of the screen go back to top and counting how many block falled down.
  if (blockY > window.innerHeight) {
    blockY = 0;
    block.style.left = Math.random() * window.innerWidth + 'px';
    fallCount++;
  }

  // Cheking the collison between your block and falling blocks.
  let blockRect = block.getBoundingClientRect();
  let squareRect = squareEl.getBoundingClientRect();
  if (
    blockRect.left < squareRect.right &&
    blockRect.right > squareRect.left &&
    blockRect.top < squareRect.bottom &&
    blockRect.bottom > squareRect.top
  ) {
    gameOver = true;
    console.log('Fallen blocks:', fallCount);
  }
  if (square.size <= 0) {
    gameOver = true;
    
  }

  requestAnimationFrame(loop);
}

// events for the buttons.
document.addEventListener('keydown', (event) => {
  if (event.key === 'j') jPressed = true;
  if (event.key === 'l') lPressed = true;
  if (event.key === 'b') rotating = !rotating; // felváltva bekapcsolja / kikapcsolja
});
document.addEventListener('keyup', (event) => {
  if (event.key === 'j') jPressed = false;
  if (event.key === 'l') lPressed = false;
  if (event.key === 'b') square.size += 0.5;
});

setup();
