const Direction = {
   LEFT: { x: -1, y: 1, name: "left" },
   RIGHT: { x: -1, y: 1, name: "right" },
   TOP: { x: 1, y: 0, name: "top" },
   BOTTOM: { x: 1, y: -1, name: "bottom" },
   NONE: { x: 1, y: 1, name: "none" },
};

let elasticity = 0.7;


export class Hitbox {
   // Might need a rotation, or become part of a shape/terrain object.
   constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
   }

   // need some function to return the axis parallel to the side of the hitbox
   getAxis() { }

   // get the projection onto some vector
   projectTo() { }
}


export class World {
   constructor(hitboxes, player) {
      this.hitboxes = hitboxes;
      this.player = player;
   }

   add(hitbox) {
      this.hitboxes.push(hitbox);
   }


   handleIntersections() {
      for (const hitbox of this.hitboxes) {
         const intersect_dir = intersect(this.player, hitbox);
         if (intersect_dir.name === "none") continue;

         switch (intersect_dir.name) {
            case "left":
               this.player.x = hitbox.x + hitbox.size[0];
               this.player.dx *= -elasticity;
               break;
            case "right":
               this.player.x = hitbox.x - this.player.size[0];
               this.player.dx *= -elasticity;
               break;
            case "top":
               this.player.y = hitbox.y + hitbox.size[1];
               this.player.dy *= -elasticity;
               break;
            case "bottom":
               this.player.y = hitbox.y - this.player.size[1];
               this.player.dy = 0;
               break;
         }
      }
   }

   draw() {
      for (const hitbox of this.hitboxes) {
         rect(hitbox.x, hitbox.y, ...hitbox.size)
      }
   }

}


function intersect(player, hitbox) {
   // Completely replace this to use SAT, this way we can use different polygons, as well as get the 
   // MVT (minimal vector translation). Allowing us to find the minimal direction of movement.
   const player_next_x_right = player.x + player.size[0];
   const player_next_x_left = player.x;
   const player_next_y_bottom = player.y + player.size[1];
   const player_next_y_top = player.y;

   const hitbox_x_right = hitbox.x + hitbox.size[0];
   const hitbox_x_left = hitbox.x;
   const hitbox_y_bottom = hitbox.y + hitbox.size[1];
   const hitbox_y_top = hitbox.y;

   // Check for overlap
   const overlapX = player_next_x_right > hitbox_x_left && player_next_x_left < hitbox_x_right;
   const overlapY = player_next_y_bottom > hitbox_y_top && player_next_y_top < hitbox_y_bottom;

   if (!(overlapX && overlapY)) {
      return Direction.NONE;
   }

   // Determine direction of collision
   const dx_center = (player_next_x_left + player.size[0] / 2) - (hitbox_x_left + hitbox.size[0] / 2);
   const dy_center = (player_next_y_top + player.size[1] / 2) - (hitbox_y_top + hitbox.size[1] / 2);

   if (Math.abs(dx_center) < player.size[0]) {
      return dx_center > 0 ? Direction.TOP : Direction.BOTTOM;
   } else {
      return dy_center > 0 ? Direction.LEFT : Direction.RIGHT;
   }
}
