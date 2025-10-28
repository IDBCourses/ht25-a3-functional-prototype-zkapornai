const squareEl = document.getElementById('square');

// Variables
const square = {
  x: 600,
  y: 620,
  width: 50,
  height: 50,
  speed: 5,
  colour: 0,
};

function loop() {
  update();1
  draw();
  requestAnimationFrame(loop);
}

//update function for keydown
function update() {

}

// draw: a square megjelenítése a DOM-on
function draw() {
  squareEl.style.left = square.x + 'px';
  squareEl.style.top = square.y + 'px';
  squareEl.style.width = square.width + 'px';
  squareEl.style.height = square.height + 'px';
  squareEl.style.backgroundColor = `hsl(${square.colour}, 100%, 50%)`; // szín HSL-ben
}

// keydown wvwnt. Moving left and right for j and l. Changing colour when using this two, for emotion.
document.addEventListener('keydown', (event) => {
  if (event.key === 'j') {
    square.x -= square.speed;
    square.colour += 40; // színváltozás
    if (square.colour > 360) square.colour -= 360; // körbeforgatás
  }
  if (event.key === 'l') {
    square.x += square.speed;
    square.colour += 40; // színváltozás
    if (square.colour > 360) square.colour -= 360; // körbeforgatás
  }
  
});

loop();
