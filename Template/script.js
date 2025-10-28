import * as Util from "./util.js";
let size = 1;

function loop() {
  Util.setSize(size)
  size += 0.1
    window.requestAnimationFrame(loop);
}

function setup() {

  window.requestAnimationFrame(loop);
}

setup();
