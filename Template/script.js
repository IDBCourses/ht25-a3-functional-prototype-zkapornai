const squareEl = document.getElementById('square');  	              // Get the HTML element with id "square"  
let square = { x: 600, y: 620, speed: 5, colour: 60, size: 100 };  	// Object storing position, speed, color, and size of the square  

 
const blocks = [];  	                          // Array to hold all falling block objects  
let blockCount = 5;  	                        // Number of falling blocks
for (let i = 0; i < blockCount; i++) {  	      // Loop to create each falling block  
  let block = document.createElement('div');  	// Create a new div for the block  
  block.classList.add('fallingBlock');  	      // Add CSS class for styling  
  document.body.appendChild(block);  	          // Add the block to the page  
  blocks.push({ el: block, x: Math.random() * window.innerWidth, y: Math.random() * -500 });  	// Store block element with random start position  
}

let fallCount = 0;  	  // Counter for how many blocks have fallen 
let score = 0;          // Track player score
let gameOver = false;  	// Boolean to track if the game has ended  
let jPressed = false;  	// Track if the "j" key is pressed (move left)  
let lPressed = false;  	// Track if the "l" key is pressed (move right)  
let aPressed = false;  	// Track if the "a" key is pressed (resize action) 

function loop() {  	      // Main loop that runs continuously using requestAnimationFrame  
  
  if (gameOver) return;  	// Stop the loop if the game is over  

  // Square movement  
  if (jPressed) square.x -= square.speed;  	// Move left when "j" is pressed  
  if (lPressed) square.x += square.speed;  	// Move right when "l" is pressed  

  // Rotate blocks based on score
  // rotation handled inside the movement loop below (when score > 10)


  // When "a" is pressed → continuous shrink and color change  
  if (aPressed) {  	                                  // Check if "a" is being held down  
      square.size = Math.max(5, square.size - 0.5);  	// Decrease size but not below 5  
  }

  // square appearance  
  squareEl.style.left = square.x + 'px';  	    // Set horizontal position  
  squareEl.style.top = square.y + 'px';  	      // Set vertical position  
  squareEl.style.width = square.size + 'px';  	// Update width  
  squareEl.style.height = square.size + 'px';  	// Update height  
  
  // Move blocks and check collisions  
  for (let b of blocks) {  	                           // Iterate through each falling block  
    b.y += 6;  	                                      // Make the block fall down (speed = 6)  
    if (b.y > window.innerHeight) {  	               // If block goes below screen  
      b.y = -100;  	                                // Reset it to the top  
      b.x = Math.random() * window.innerWidth;  	 // Random new horizontal position  
      fallCount++;  	                            // Increase fallen block counter  
      score++;                                      // increase score when a block falls naturally
      console.log('Block fallen. fallCount:', fallCount, 'score:', score);
    }
    // start continuous rotation when score > 10
    if (score > 5) {
      b._rotation = (b._rotation || 0) + 2;
      b.el.style.transform = `rotate(${b._rotation}deg)`;
    }
    b.el.style.left = b.x + 'px';  	 // Update block horizontal position  
    b.el.style.top = b.y + 'px';  	// Update block vertical position  

    // Collision detection between player square and block  
    const sRect = squareEl.getBoundingClientRect();  	// Get bounding box of the square  
    const bRect = b.el.getBoundingClientRect();  	    // Get bounding box of the block  
    if (  	                                          // Check if rectangles overlap  
      bRect.left < sRect.right &&  
      bRect.right > sRect.left &&  
      bRect.top < sRect.bottom &&  
      bRect.bottom > sRect.top  
    ) {  
      gameOver = true;  	                                     // End the game if they collide  
      console.log('Game Over! Score:', fallCount);  	        // Print result to console  
    }  
  }

  if (square.size <= 5) gameOver = true;  	// End the game if the square becomes too small  

  requestAnimationFrame(loop);  	         // Continue the loop for next animation frame  
}

// Keyboard controls  
document.addEventListener('keydown', (e) => {  	// Detect key press once per keydown  
  if (e.repeat) return;  	                    // Prevent continuous movement while holding the key  

  if (e.key === 'j') {  	                    // If "j" is pressed  
    square.x -= 10;  	                        // Move left by 10 pixels  
  }  
  if (e.key === 'l') {  	                    // If "l" is pressed  
    square.x += 10;  	                        // Move right by 10 pixels  
  }  
  if (e.key === 'a') {  	                    
    // Single shrink timer version (no holding)
    square.size = Math.max(5, square.size - 10);
    // subtract 3 from fallen blocks when using shrink, then set score = fallCount
    fallCount = Math.max(0, fallCount - 3);
    score = fallCount;
    console.log('Shrink used — fallCount:', fallCount, 'score:', score);
    aPressed = true; // allow hold-to-shrink in the main loop (keydown fires once thanks to e.repeat check)
  }
});

document.addEventListener('keyup', (e) => {  	// Detect key release  
  if (e.key === 'a') {  	                    // When releasing "a"  
    aPressed = false;  	                        // Stop shrinking  
  }  
});

// Calling setup function to start the game  
function setup() {  	// Function to initialize the game  
  loop();  	          // Start the game loop  
  growSquare();        // Start square growth
  updateColorLoop();   // Start color updates
  growBlocks();        // Start block growth
}

setup();  	  // Start the game setup when the script loads 


//1. The square slowly grows over time (setTimeout version)
function growSquare() {
  if (gameOver) return;
  square.size += 10;
  setTimeout(growSquare, 2000); // repeats every 2s
}


//2. The square's color changes depending on its size (setTimeout version)
function updateColor() {
  const hue = 240 - square.size; // simple shift from blue to red
  squareEl.style.backgroundColor = `hsl(${hue}, 100%, 40%)`;
}

function updateColorLoop() {
  if (gameOver) return;
  updateColor();
  setTimeout(updateColorLoop, 100); // update every 0.1s
}


//3. The falling blocks slowly grow and new blocks appear (setTimeout version)
function growBlocks() {
  if (gameOver) return;

  blocks.forEach(b => {
    b.el.style.width = b.el.offsetWidth + 3 + 'px';
    b.el.style.height = b.el.offsetHeight + 3 + 'px';
    b.speed = (b.speed || 6) + 1;
  });

  // Add a new block
  let block = document.createElement('div');
  block.classList.add('fallingBlock');
  document.body.appendChild(block);
  blocks.push({ el: block, x: Math.random() * window.innerWidth, y: Math.random() * -500 });

  setTimeout(growBlocks, 3000); // repeats every 3s
}