// A te játékosod
const squareEl = document.getElementById('square');
let square = { x: 600, y: 620, speed: 5, colour: 60, size: 100 };

// Leeső blokk
let block = document.createElement('div');
block.classList.add('fallingBlock');
document.body.appendChild(block);
let blockY = 0;

let fallCount = 0;
let gameOver = false;
let jPressed = false;
let lPressed = false;
let rotating = false;

// setup: játék indítása
function setup() {
  loop();
}

// loop: minden képkockán lefut
function loop() {
  if (gameOver) return;

  // billentyűk kezelése folyamatosan
  if (jPressed) square.x -= square.speed;
  if (lPressed) square.x += square.speed;

  // forgatás/színváltozás
  if (rotating) {
    square.colour += 10;
    square.size -= 0.5;
  }

  // Játékos négyzete
  squareEl.style.left = square.x + 'px';
  squareEl.style.top = square.y + 'px';
  squareEl.style.width = square.size + 'px';
  squareEl.style.height = square.size + 'px';
  squareEl.style.backgroundColor = 'rgb(' + square.colour + ',0,0)';

  // A blokk mozog lefelé
  blockY += 8;
  block.style.top = blockY + 'px';

  // Ha leér, vissza a tetejére és növeli a számlálót
  if (blockY > window.innerHeight) {
    blockY = 0;
    block.style.left = Math.random() * window.innerWidth + 'px';
    fallCount++;
  }

  // Ütközés ellenőrzése
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

// Billentyűk kezelése
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
