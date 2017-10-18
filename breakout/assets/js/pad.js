/**
 * pad.js 
 * 
 * Pad Class
 * Pad object that is controlled by the player. The ball bounces off of the pad.
 * 
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  z - Z/depth position of the entity
 * @param {number}  width - Width of the entity
 * @param {number}  height - Height of the entity
 * 
 * @author          Ali Kutluozen
 */
function Pad(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    this.controlled = true; // This variable is needed to be able to receive control events

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

// Establish the inheritance
Pad.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Pad.prototype.draw = function () {
    this.ctx.drawImage(this.img, 0, 32, 128, 16, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Pad.prototype.update = function () {
    // Center it to the mouse
    this.x = this.movement.x - this.width / 2;

    // Make sure it doesn't get out from the screen
    if (this.x <= 32) {
        this.x = 32;
    } else if (this.x + this.width >= 608) {
        this.x = 608 - this.width;
    }

    this.coll.update(this.x, this.y); // Always update the collision area position
}

// Whenever a mouse movement event is sent, response to it by holding the input (x and y values);
Pad.prototype.handleMouseMovement = function (input) {
    this.movement = input;
}