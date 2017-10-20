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
function Cannon(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    this.controlled = true; // This variable is needed to be able to receive control events

    this.clicked = false;
    this.direction = 0;

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

// Establish the inheritance
Cannon.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Cannon.prototype.draw = function () {
    // this.ctx.drawImage(this.img, 0, 32, 128, 16, this.x, this.y, this.width, this.height);
    this.ctx.save();
    this.ctx.translate(this.x + this.width / 2, this.y + this.height);
    this.ctx.rotate(this.direction * Math.PI / 180);
    this.ctx.translate(-(this.x + this.width / 2), -(this.y + this.height));
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.coll.draw();
    this.ctx.restore();
}

Cannon.prototype.update = function () {
    this.coll.update(this.x, this.y); // Always update the collision area position
}

// Whenever a mouse movement event is sent, response to it by holding the input (x and y values);
Cannon.prototype.handleMouseMovement = function (input) {
    if (this.clicked) {
        input.x = Gate2D.Math.clamp(input.x, 0, Gate2D.Video.getDeviceWidth());
        this.direction = (input.x / (Gate2D.Video.getDeviceWidth() / 360))/2 - 90;
    }

}

// Start the game when clicked
Cannon.prototype.handleMouseDown = function (input) {
    this.clicked = true;

    switch (Gate2D.Manager.gameStatus()) {
        case 'waiting': Gate2D.Manager.gameStatus('on'); break;
        default: break;
    }
}

// Start the game when clicked
Cannon.prototype.handleMouseUp = function (input) {
    this.clicked = false;
}