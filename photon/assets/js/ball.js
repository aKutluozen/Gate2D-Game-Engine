/**
 * ball.js 
 * 
 * Ball Class
 * It is involved with a lot of game action since it is the main object of the game
 * 
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  z - Z/depth position of the entity
 * @param {number}  width - Width of the entity
 * @param {number}  height - Height of the entity
 * @param {string}  name - Name of the entity
 * @param {string}  tag - Tag of the entity
 * 
 * @author          Ali Kutluozen
 */
function Ball(x, y, z, width, height, name, tag) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    // Initial speed
    this.speedX = 0;
    this.speedY = 0;
    this.initX = x;
    this.initY = y;

    this.controlled = true;

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width, height);
}

// Establish the inheritance
Ball.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Ball.prototype.draw = function () {
    this.ctx.drawImage(this.img, 128, 32, 24, 24, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Ball.prototype.update = function () {
    // Save the previous spot - Will be used when checking collision from different angles
    let prevX = this.coll.x - this.speedX,
        prevY = this.coll.y - this.speedY;

    // Check around
    if (other = Gate2D.Physics.checkCollision(this)) {

        for (let i = 0, len = other.length; i < len; i++) {

            if (other[i].name === 'wall') {
                // Collision from right
                if (prevX <= other[i].coll.x) {
                    this.speedX = -Math.abs(this.speedX);
                }

                // Collision from left
                if (prevX >= other[i].coll.x + other[i].coll.width) {
                    this.speedX = Math.abs(this.speedX);
                }

                // Collision from the bottom
                if (prevY >= other[i].coll.y + other[i].coll.height) {
                    this.speedY = Math.abs(this.speedY);
                }
            }

            // If there is collision with more than one object, break out and check again
            if (other.length > 1) {
                break;
            }
        }
    }

    // Update the ball position
    this.x += this.speedX;
    this.y += this.speedY;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.width / 2);
}

Ball.prototype.handleMouseUp = function () {

}
// Need button

Ball.prototype.fire = function () {
    // Save the beginning spot
    this.x = this.initX + 8;
    this.y = this.initY + 8;

    // Get the direction from the cannon and assign the speed
    this.movement = Gate2D.Math.direction(Gate2D.Objects.get('cannon').direction - 90, 32);

    this.speedX = this.movement.x;
    this.speedY = this.movement.y;
}