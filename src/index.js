import * as  player from './player.js'

let windowWidth = 1000;
let windowHeight = 800;
let player;

let Xspeed, Yspeed;


function setup() {
   let canvas = createCanvas(windowWidth, windowHeight);
   canvas.parent('game-container'); // attach canvas to the div

   player = [20, height/3*2, 30, 30]
   Xspeed = 5; Yspeed = 2;
}

function draw() {
   background(255);
   line(0, height/3*2+30, width, height/3*2+30);
   rect(...player);

   if (keyIsDown(RIGHT_ARROW) === true){
      playerMovesRight();
   }

   if (keyIsDown(LEFT_ARROW) === true){
      playerMovesLeft();
   }
   keyPressed();

}

function keyPressed(){
   console.log(keyCode);
  
   if (keyCode === 38){
      playerJumps();
   }
}

function playerMovesLeft(){
   player[0] = player[0] - Xspeed;
}

function playerMovesRight(){
   player[0] = player[0] + Xspeed;
}

function playerJumps(){
   player[1] = player[1] + Yspeed^2 - 2*Yspeed;
}
// 👇 Make sure p5 can access these:
window.setup = setup;
window.draw = draw;
