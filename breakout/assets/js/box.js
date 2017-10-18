/**
 * box.js 
 * 
 * Box Class
 * Colorful boxes that are waiting for ball to destroy them. The ball bounces off of them.
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
function Box(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    this.randomColor = Math.floor(Math.random() * 7) * 64; // Select a random color from the sprite sheet

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

// Establish the inheritance
Box.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Box.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.randomColor, 0, 64, 32, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Box.prototype.update = function () {
    this.coll.update(this.x, this.y); // Always update the collision area position
}