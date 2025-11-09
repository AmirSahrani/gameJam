let resistance = 0.9;
let gravity = 0.9;

export class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = [30,30];

    
    }

    move() {
        this.dx = this.dx * resistance;
        if (Math.abs(this.dx) < 1e-6)
            { this.dx = 0};
        this.x = this.x + this.dx;
        
        this.dy = (resistance * this.dy) + gravity;
        this.y = Math.min(this.y + this.dy, 500);

    }
}


export function handlePlayerMovement(player) {

   keyPressed(player);

   player.move();
   rect(player.x, player.y, ...player.size);

}

   

   
function keyPressed(player){
    if (keyIsDown(RIGHT_ARROW) === true){
      playerMovesRight(player);
   }

   if (keyIsDown(LEFT_ARROW) === true){
      playerMovesLeft(player);
   }
   if (keyIsDown(38)){
      playerJumps(player);
   }
}

function playerMovesLeft(p){
   p.dx = -10;
}

function playerMovesRight(p){
   p.dx = 10;
}

function playerJumps(p){
   p.dy = -10;
}