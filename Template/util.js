/**
 * Utilities adapted for your game (squareEl + square + blocks)
 */

export const thing = squareEl; // default element for player square

/* ---------------- COLOUR ---------------- */
export function setColour(h, s = 100, l = 50, a = 1, element = thing) {
  square.colour = h;
  if (element != null) {
    element.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%, ${a})`;
  }
}

/* ---------------- POSITION ---------------- */
export function setPosition(x, y, element = thing) {
  // normalized coordinates (0..1)
  square.x = x * window.innerWidth;
  square.y = y * window.innerHeight;

  if (element != null) {
    element.style.left = `${square.x}px`;
    element.style.top = `${square.y}px`;
  }
}

export function setPositionPixels(px, py, element = thing) {
  square.x = px;
  square.y = py;

  if (element != null) {
    element.style.left = `${square.x}px`;
    element.style.top = `${square.y}px`;
  }
}

/* ---------------- SIZE ---------------- */
export function setSize(sizeOrWidth, height = null, element = thing) {
  const width = sizeOrWidth;
  const h = height === null ? sizeOrWidth : height;

  square.size = width; // use width as main size
  if (element != null) {
    element.style.width = `${width}px`;
    element.style.height = `${h}px`;
  }
}

/* ---------------- ROTATION ---------------- */
// ✅ FIXED VERSION — works for both square and blocks
export function setRotation(angle, element = null) {
  if (!element) return;

  // Store rotation on the element itself (so every block can have its own)
  element._rotation = angle;

  // Only rotate — do NOT affect left/top or translate
  element.style.transform = `rotate(${angle}deg)`;
}

/* ---------------- ROUNDEDNESS ---------------- */
export function setRoundedness(roundedness, element = thing) {
  square.roundedness = roundedness;
  if (element != null) {
    element.style.borderRadius = `${roundedness * 100}%`;
  }
}

/* ---------------- CREATE ELEMENT ---------------- */
export function createThing(id = null, className = "thing") {
  const el = document.createElement("div");
  if (className) el.className = className;

  if (id) {
    let newId = id;
    let counter = 1;
    while (document.getElementById(newId)) {
      newId = `${id}-${counter++}`;
    }
    el.id = newId;
  }

  document.body.appendChild(el);
  return el;
}
