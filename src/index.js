import * as  pl from './player.js'
import * as  wd from './world.js'

let windowWidth = 1000;
let windowHeight = 800;

let player = new pl.Player(150, 320);
let hitboxes = [
   new wd.Hitbox(300, 300, [60, 100]),
   new wd.Hitbox(530, 300, [60, 100]),
   new wd.Hitbox(310, 300, [60, 100]),
   new wd.Hitbox(800, 300, [60, 100]),
   new wd.Hitbox(0, 600, [999, 100]),
]
let world = new wd.World(hitboxes, player);



function setup() {
   let canvas = createCanvas(windowWidth, windowHeight);
   canvas.parent('game-container'); // attach canvas to the div


}
function draw() {
   // the draw function should probably run a "physics step" twice, this way we can get smoother
   // movement
   background(255);
   pl.handlePlayerMovement(player);
   world.handleIntersections();
   player.move();

   world.draw();
   player.draw();


}

// 👇 Make sure p5 can access these:   
window.setup = setup;
window.draw = draw;
