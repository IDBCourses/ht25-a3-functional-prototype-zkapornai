
const squareEl = document.getElementById('square');  	// Get the HTML element with id "square"  
let square = { x: 600, y: 620, speed: 5, colour: 60, size: 100 };  	// Object storing position, speed, color, and size of the square  

 
const blocks = [];  	// Array to hold all falling block objects  
const blockCount = 5;  	// Number of falling blocks  
for (let i = 0; i < blockCount; i++) {  	// Loop to create each falling block  
  let block = document.createElement('div');  	// Create a new div for the block  
  block.classList.add('fallingBlock');  	// Add CSS class for styling  
  document.body.appendChild(block);  	// Add the block to the page  
  blocks.push({ el: block, x: Math.random() * window.innerWidth, y: Math.random() * -500 });  	// Store block element with random start position  
}

let fallCount = 0;  	// Counter for how many blocks have fallen  
let gameOver = false;  	// Boolean to track if the game has ended  
let jPressed = false;  	// Track if the "j" key is pressed (move left)  
let lPressed = false;  	// Track if the "l" key is pressed (move right)  
let bPressed = false;  	// Track if the "b" key is pressed (resize action)  

// setup  
function setup() {  	// Function to initialize the game  
  loop();  	// Start the game loop  
}


function loop() {  	// Main loop that runs continuously using requestAnimationFrame  
  if (gameOver) return;  	// Stop the loop if the game is over  

  // Square movement  
  if (jPressed) square.x -= square.speed;  	// Move left when "j" is pressed  
  if (lPressed) square.x += square.speed;  	// Move right when "l" is pressed  

  // When "b" is pressed → continuous shrink and color change  
  if (bPressed) {  	// Check if "b" is being held down  
      square.size = Math.max(5, square.size - 0.5);  	// Decrease size but not below 5  
  }

  // square appearance  
  squareEl.style.left = square.x + 'px';  	// Set horizontal position  
  squareEl.style.top = square.y + 'px';  	// Set vertical position  
  squareEl.style.width = square.size + 'px';  	// Update width  
  squareEl.style.height = square.size + 'px';  	// Update height  
  squareEl.style.backgroundColor = 50;  	// (Bug) Should be color update, currently constant value  

  // Move blocks and check collisions  
  for (let b of blocks) {  	// Iterate through each falling block  
    b.y += 6;  	// Make the block fall down (speed = 6)  
    if (b.y > window.innerHeight) {  	// If block goes below screen  
      b.y = -100;  	// Reset it to the top  
      b.x = Math.random() * window.innerWidth;  	// Random new horizontal position  
      fallCount++;  	// Increase fallen block counter  
    }
    b.el.style.left = b.x + 'px';  	// Update block horizontal position  
    b.el.style.top = b.y + 'px';  	// Update block vertical position  

    // Collision detection between player square and block  
    const sRect = squareEl.getBoundingClientRect();  	// Get bounding box of the square  
    const bRect = b.el.getBoundingClientRect();  	// Get bounding box of the block  
    if (  	// Check if rectangles overlap  
      bRect.left < sRect.right &&  
      bRect.right > sRect.left &&  
      bRect.top < sRect.bottom &&  
      bRect.bottom > sRect.top  
    ) {  
      gameOver = true;  	// End the game if they collide  
      console.log('Game Over! Fallen blocks:', fallCount);  	// Print result to console  
    }  
  }

  if (square.size <= 5) gameOver = true;  	// End the game if the square becomes too small  

  requestAnimationFrame(loop);  	// Continue the loop for next animation frame  
}

// Keyboard controls  
document.addEventListener('keydown', (e) => {  	// Detect key press  
  if (e.key === 'j') jPressed = true;  	// Move left  
  if (e.key === 'l') lPressed = true;  	// Move right  
  if (e.key === 'b') bPressed = true;  	// Activate shrink/color effect  
});

document.addEventListener('keyup', (e) => {  	// Detect key release  
  if (e.key === 'j') jPressed = false;  	// Stop moving left  
  if (e.key === 'l') lPressed = false;  	// Stop moving right  
  if (e.key === 'b') {  	// When releasing "b"  
    bPressed = false;  	// Stop shrink/color effect  
    square.size += 15;  	// Slightly regrow the square  
  }  
});

setup();  	// Start the game setup when the script loads  