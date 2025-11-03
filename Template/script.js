//constant variables
const squareEl = document.getElementById('square');  	              // Get the HTML element with id "square"
const blocks = [];  	                                             // Array to hold all falling block objects  
const blockCount = 5;  	                                          // Number of falling blocks  

// Changing Variables 
let square = { x: 600, y: 620, speed: 5, colour: 60, size: 100 };  	// Object storing position, speed, color, and size of the square
let score = 0;                                                    // Track player score
let gameOver = false;  	                                         // Boolean to track if the game has ended  
let aPressed = false;  	                                        // Track if the "a" key is pressed (resize action) 
let jPressed = false;                                          // Track if the "j" key is pressed (move left)
let lPressed = false;                                         // Track if the "l" key is pressed (move right)
let moveStartTime = 0;                                       // Track when continuous movement started
let isSlowSpeed = false;                                    // Track if we should use slow speed

// Create falling blocks in array
for (let i = 0; i < blockCount; i++) {  	      // Loop to create each falling block  
  let block = document.createElement('div');  	// Create a new div for the block  
  block.classList.add('fallingBlock');  	      // Add CSS class for styling  
  document.body.appendChild(block);  	          // Add the block to the page  
  blocks.push({ el: block, x: Math.random() * window.innerWidth, y: Math.random() * -500});  	// Store block element with random start position  
}


function loop() {  	      // Main loop that runs continuously using requestAnimationFrame  
  
  if (gameOver) {
    document.body.style.backgroundColor = 'lightcoral'; // Change background color on game over
    return;  	                                         // Stop the loop if the game is over 
  }

  // Square movement  
  if (jPressed || lPressed) {
    const currentTime = Date.now();       // Get current time
    if (moveStartTime === 0) {           // If movement just started
      moveStartTime = currentTime;      // Record the time when movement started
    }
    // Check if moving for more than 1 second
    isSlowSpeed = (currentTime - moveStartTime) > 1000;                   // slow speed is true if current time more than 1s
    
    const currentSpeed = isSlowSpeed ? square.speed / 2 : square.speed;  // Use half speed if slow speed is active
    
    if (jPressed) square.x -= currentSpeed;      // Move left when "j" is pressed
    if (lPressed) square.x += currentSpeed;      // Move right when "l" is pressed
  } else {
    moveStartTime = 0;       // Reset timer when not moving
    isSlowSpeed = false;    // Reset slow speed flag
  }
  
  square.x = Math.min(Math.max(square.x, 0), window.innerWidth - square.size);  // Keep square within screen bounds



  // When "a" is pressed → continuous shrink and color change  
  if (aPressed) {  	                                  
      square.size = Math.max(5, square.size - 0.5);  	    // Gradually decrease size (minimum 5)
  }

  // square appearance  
  squareEl.style.left = square.x + 'px';  	    // Set horizontal position  
  squareEl.style.top = square.y + 'px';  	      // Set vertical position  
  squareEl.style.width = square.size + 'px';  	// Update width  
  squareEl.style.height = square.size + 'px';  	// Update height  
  
// Falling blocks movement and collision detection
  for (let b of blocks) {  	                           // Iterate through each falling block  
    b.y += 6;  	                                      // Make the block fall down (speed = 6)  
    if (b.y > window.innerHeight) {  	               // If block goes below screen  
      b.y = -100;  	                                // Reset it to the top  
      b.x = Math.random() * window.innerWidth;  	 // Random new horizontal position  
      score++;                                      // increase score when a block falls naturally  
      console.log('score:', score);
      updateScoreDisplay();                         // Update score display function. Update screen.
    }
    
    // start continuous rotation when score > 10
    if (score > 10) {
      b.rotation = (b.rotation || 0) + 2;                 // Use the rotation property. b is the block object and || 0 is for default value. +2 degrees per frame
      b.el.style.transform = `rotate(${b.rotation}deg)`; // Apply rotation to the block
    }

   // Update falling blocks position on screen
    b.el.style.left = b.x + 'px';  	 // Update block horizontal position  
    b.el.style.top = b.y + 'px';  	// Update block vertical position  

    // Collision detection between player square and block  
    const sRect = squareEl.getBoundingClientRect();  	// Get bounding box of the square  
    const bRect = b.el.getBoundingClientRect();  	   // Get bounding box of the block  
   
    if (  	                                          // Check if rectangles overlap  
      bRect.left < sRect.right &&                    // Left edge of block is left of right edge of square
      bRect.right > sRect.left &&                   // Right edge of block is right of left edge of square
      bRect.top < sRect.bottom &&                  // Top edge of block is above bottom edge of square
      bRect.bottom > sRect.top                    // Bottom edge of block is below top edge of square
    ) {  
      gameOver = true;  	                                     // End the game if they collide  
      console.log('Game Over! Score:', score);  	            // Print result to console  
    }  
  }

  if (square.size <= 5) gameOver = true;  	// End the game if the square becomes too small  

  requestAnimationFrame(loop);  	         // Continue the loop for next animation frame  
}



// Keyboard controls  
document.addEventListener('keydown', (e) => {
  if (e.repeat) return;

  if (e.key === 'j') {
    // Modify the Square movement section in the loop function
      // Square movement  
      if (jPressed || lPressed) {            // If either key is pressed
        const currentTime = Date.now();     // Get current time
        if (moveStartTime === 0) {         // If movement just started
          moveStartTime = currentTime;    // Record the time when movement started
        }
        // Check if moving for more than 1 second
        isSlowSpeed = (currentTime - moveStartTime) > 1000;
        
        const currentSpeed = isSlowSpeed ? square.speed / 2 : square.speed;     // Use half speed if slow speed is active
        
        if (jPressed) square.x -= currentSpeed;     // Move left when "j" is pressed
        if (lPressed) square.x += currentSpeed;    // Move right when "l" is pressed
      } else {
        moveStartTime = 0;  // Reset timer when not moving
        isSlowSpeed = false;
      }
      
      square.x = Math.min(Math.max(square.x, 0), window.innerWidth - square.size);
    if (jPressed) {
      jPressed = false;  // stop moving left if already moving
    } else {
      jPressed = true;   // start moving left
      lPressed = false;  // ensure right movement is off
      moveStartTime = Date.now(); // Record the time when movement started
    }
  }
  
  if (e.key === 'l') {
    if (lPressed) {
      lPressed = false;  // stop moving right if already moving
    } else {
      lPressed = true;   // start moving right
      jPressed = false;  // ensure left movement is off
      moveStartTime = Date.now(); // Record the time when movement started
    }
  }

  if (e.key === 'a') {  	                    
    if (!aPressed) {                           // only on first press
        score = Math.max(0, score - 3);        // subtract 3 points once per press
        document.body.style.backgroundColor = 'lightblue'; // Change background color when shrinking
        blocks.forEach(b => b.el.style.backgroundColor = 'black'); // Change color of all blocks
        updateScoreDisplay();
    }
    aPressed = true;                            // Start shrinking
  }
});


document.addEventListener('keyup', (e) => {  	// Detect key release  
  if (e.key === 'a') {  	                    // When releasing "a"  
    aPressed = false;  	                        // Stop shrinking  
    document.body.style.backgroundColor = 'skyblue'; // Reset background color when not shrinking
    blocks.forEach(b => b.el.style.backgroundColor = 'white'); // Change back color of all blocks
  }  
});

setup();  	  // Start the game setup when the script loads

// Update the score display on screen 
function updateScoreDisplay() {
  const scoreEl = document.getElementById('scoreDisplay');
  if (scoreEl) scoreEl.textContent = `Score: ${Math.floor(score)}`;     // Update score display
}

//1. The square slowly grows over time in 2 seconds (setTimeout version)
function growSquare() {
  if (gameOver) return;
  square.size += 10;
  setTimeout(growSquare, 2000); 
}


//2. The square's color changes depending on its size (setTimeout version)
function updateColor() {
  const hue = 240 - square.size; // simple shift from blue to red
  squareEl.style.backgroundColor = `hsl(${hue}, 100%, 40%)`;
}

// Repeatedly update color
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
   
  });

  // Add a new block in a random position and every 3 seconds
  let block = document.createElement('div');                                                   // Create a new div for the block
  block.classList.add('fallingBlock');                                                           // Add CSS class for styling
  document.body.appendChild(block);                                                             // Add the block to the page
  blocks.push({ el: block, x: Math.random() * window.innerWidth, y: Math.random() * -500 });   // Store block element with random start position

  setTimeout(growBlocks, 3000);
}

// Calling functions to start the game  
function setup() {  	
  loop();  	          
  growSquare();        
  updateColorLoop();   
  growBlocks();        
  updateScoreDisplay(); 
}