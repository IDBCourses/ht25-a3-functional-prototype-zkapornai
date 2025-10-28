import * as Util from "./util.js";

const square = document.getElementById('square');
let squareX= 180;
let speed = 5;
let squareMoving = []


//loop function
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
 
// future setup here
function setup() {
  
}

// move blocks, check collisions
function update() {

}

function draw() {
  square.style.left = squareX + 'px';
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'j') squareX -= speed;
  if (event.key === 'l') squareX += speed;
});

setup();
loop();