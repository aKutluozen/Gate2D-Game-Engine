/**
 * wall.js 
 * 
 * Wall Class
 * Sides of the game area. The ball bounces off of them.
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

function Wall(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

// Establish the inheritance
Wall.prototype = new Gate2D.Entity();

// Define object main methods draw and there is no need for update since these are static items
Wall.prototype.draw = function () {    
    this.ctx.drawImage(this.img, 480, 32, 32, 32, this.x, this.y, this.width, this.height);
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.coll.draw();
}