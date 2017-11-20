/**
 * wall.js 
 * 
 * Wall Class
 * Sides of the game area. The photon bounces off of them.
 * 
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  z - Z depth position of the entity
 * @param {number}  width - Width of the entity
 * @param {number}  height - Height of the entity
 * 
 * @author          Ali Kutluozen
 */

function Wall(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image
    this.active = false;
    this.jitter = 0;

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

// Establish the inheritance
Wall.prototype = new Gate2D.Entity();

// Define object main methods draw and there is no need for update since these are static items
Wall.prototype.draw = function () {
    if (this.tag === 'photonWall') {
        this.ctx.drawImage(this.img, 272, 304, 224, 32, this.x, this.y - (this.jitter++ % 10) / 2, this.width, this.height + this.jitter++ % 10);
    }
    this.coll.draw();
}

Wall.prototype.update = function () {
    if (this.active) {
        if (this.width <= 720) {
            this.width += 16;
            this.x -= 8;
        }
    }
}