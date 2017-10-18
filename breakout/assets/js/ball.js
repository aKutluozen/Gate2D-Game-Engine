function Ball(x, y, z, width, height, name, tag, controlled) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    this.speedX = 2;
    this.speedY = 2;
    this.controlled = true;

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width, height);
}

// Establish the inheritance
Ball.prototype = new Gate2D.Entity();

// Define object methods
Ball.prototype.draw = function () {
    this.ctx.drawImage(this.img, 128, 32, 24, 24, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Ball.prototype.update = function () {
    // Save the previous spot
    let prevX = this.coll.x - this.speedX,
        prevY = this.coll.y - this.speedY;

    // Check around - PROBLEM: ONLY CARES ABUT ONE OBJECT OF A KIND...
    if (other = Gate2D.Physics.checkCollision(this)) {

        for (let i = 0, len = other.length; i < len; i++) {
            if (other[i].name === 'box') {
                // Collision from left or right
                if (prevX <= other[i].coll.x || prevX >= other[i].coll.x + other[i].coll.width) {
                    this.speedX *= -1;
                }

                // Collision from top or bottom
                if (prevY <= other[i].coll.y || prevY >= other[i].coll.y + other[i].coll.height) {
                    this.speedY *= -1;
                }

                // Send away the broken box object
                other[i].y = -100;
                // Increment the score!
                Gate2D.Globals.score++;
            }

            if (other[i].name === 'pad') {
                if (prevY <= other[i].coll.y + other[i].coll.height) {
                    this.speedY *= -1.05; // Ball gets gradually faster
                    this.speedY = Gate2D.Math.clamp(this.speedY, -5, 5); // There is a limit to balls vertical speed
                    this.speedX = Gate2D.Math.clamp(((this.coll.x + this.coll.width / 2 - (other[i].coll.x + other[i].coll.width / 2)) * 0.1), -5, 5);
                }
            }

            if (other[i].name === 'wall') {

                // Collision from right
                if (prevX <= other[i].coll.x) {
                    this.speedX = -Math.abs(this.speedX);
                } 

                // Collision from left
                else if (prevX >= other[i].coll.x + other[i].coll.width) {
                    this.speedX = Math.abs(this.speedX);
                } 

                // Collision from the bottom
                else if (prevY >= other[i].coll.y + other[i].coll.height) {
                    this.speedY = Math.abs(this.speedY);
                }
            }

            if (other.length > 1) {
                break;
            }
        }
    }

    if (this.coll.y > Gate2D.Levels.currentLevel().height - 16) {
        Gate2D.Engine.gameStatus('over');
        Gate2D.Globals.life--;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.width / 2);
}

Ball.prototype.handleMouseMovement = function (input) {
    this.movement = input;
}