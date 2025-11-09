import * as  pl from './player.js'

let windowWidth = 1000;
let windowHeight = 800;

let player = new pl.Player(20, windowHeight/3*2);


function setup() {
   let canvas = createCanvas(windowWidth, windowHeight);
   canvas.parent('game-container'); // attach canvas to the div
   
}

function draw() {
   background(255);
   pl.handlePlayerMovement(player);
   line(0, height/3*2+30, width, height/3*2+30);
  

}

// 👇 Make sure p5 can access these:   
window.setup = setup;
window.draw = draw;
