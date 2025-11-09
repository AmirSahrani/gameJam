let windowWidth = 1000;
let windowHeight = 800;

let titleXpos = 100;
let titleYpos = 100;
let title = "Hello, World!";
let stepX = 4;
let stepY = -4;

function setup() {
   let canvas = createCanvas(windowWidth, windowHeight);
   canvas.parent('game-container'); // attach canvas to the div
}

function draw() {
   background("#D741A7");
   textSize(32);
   stroke("#3A1772");
   text(title, titleXpos, titleYpos);

   if (titleXpos > windowWidth - textWidth(title) ||
      (titleXpos < 0)) {
      stepX *= -1;
   }
   if (titleYpos > windowHeight ||
      (titleYpos < 32)) {
      stepY *= -1;
   }
   titleXpos += stepX;
   titleYpos += stepY;
}
