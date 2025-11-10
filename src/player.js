let resistance = 0.9;
let gravity = 0.9;

export class Player {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.size = [30, 30];
   }

   move() {
      // Change this to use RK4
      this.dx = this.dx * resistance;
      if (Math.abs(this.dx) < 1e-6) { this.dx = 0 };
      this.x = this.x + this.dx;

      this.dy = resistance * (this.dy + gravity);
      if (Math.abs(this.dy) < 1e-6) { this.dy = 0 };
      this.y = this.y + this.dy;


   }
   draw() {
      rect(this.x, this.y, ...this.size);
   }

}

export function handlePlayerMovement(player) {
   // Needs better handling of keypresses, e.g. what if player lets go
   // does this imply they are now wanting to break? Should that be done with friction
   // Or should the player ''stick'' to the ground (would be nice for moving platforms).
   if (keyIsDown(RIGHT_ARROW) === true) {
      player.dx = 10;
   }

   if (keyIsDown(LEFT_ARROW) === true) {
      player.dx = -10;
   }
   if (keyIsDown(38)) {
      player.dy = -10;
   }

}
