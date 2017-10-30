/**
 * Photon.js 
 * 
 * Photon Class
 * It is involved with a lot of game action since it is the main trajectory of the game
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
function Photon(x, y, z, width, height, name, tag) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image

    // Initial speed
    this.speedX = 0;
    this.speedY = 0;

    // Initial position
    this.initX = x - 8;
    this.initY = y;

    // Hit positions for drawing trail
    this.hitX = this.initX + 16;
    this.hitY = this.initY + 16;
    this.hitOpacity = 1; // This will be recharged each time and will be reduced to 0 in drawing


    this.power = 1; // Power (color) of the photon

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width, height);
}

// Establish the inheritance
Photon.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Photon.prototype.draw = function () {
    // Draw the photon only when it is moving
    if (this.speedX || this.speedY) {

        this.ctx.beginPath();
        this.ctx.moveTo(~~this.hitX, ~~this.hitY);
        this.ctx.lineTo(~~(this.x + this.width / 2), ~~(this.y + this.width / 2));
        this.ctx.stroke();
        this.ctx.lineCap = "round";
        this.ctx.closePath();

        this.hitOpacity -= 0.035;
        this.ctx.lineWidth = this.hitOpacity * 32;

        switch (this.power) {
            case 'green': {
                this.ctx.drawImage(this.img, 96, 160, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(180, 222, 22, ' + this.hitOpacity + ')';
            } break;
            case 'yellow': {
                this.ctx.drawImage(this.img, 128, 160, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(255, 255, 50, ' + this.hitOpacity + ')';
            } break;
            case 'red': {
                this.ctx.drawImage(this.img, 160, 160, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(255, 50, 50, ' + this.hitOpacity + ')';
            } break;
            default: {
                this.ctx.drawImage(this.img, 96, 160, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
            } break;
        }
    }

    this.coll.draw();
}

Photon.prototype.update = function () {
    // Save the previous spot - Will be used when checking collision from different angles
    let prevX = this.coll.x - this.speedX,
        prevY = this.coll.y - this.speedY;

    // Check around
    if (other = Gate2D.Physics.checkCollision(this)) {

        for (let i = 0, len = other.length; i < len; i++) {

            // Set the hit positions for drawing the tail
            this.hitX = this.x + this.width / 2;
            this.hitY = this.y + this.height / 2;
            this.hitOpacity = 0.75;

            if (other[i].name === 'wall') {
                let random = Math.random() / 4; // This number is needed to break the repetition of bouncing

                // Collision from right
                if (prevX <= other[i].coll.x) {
                    this.speedX = -Math.abs(this.speedX) - random;
                }

                // Collision from left
                if (prevX >= other[i].coll.x + other[i].coll.width) {
                    this.speedX = Math.abs(this.speedX) + random;
                }

                // Collision from the bottom
                if (prevY >= other[i].coll.y + other[i].coll.height) {
                    this.speedY = Math.abs(this.speedY) + random;
                }
            }

            if (other[i].name === 'enemy' && !other[i].isDead) {
                // Cache the old speed for swapping purposes
                let oldSpeedX = this.speedX,
                    oldSpeedY = this.speedY,
                    random = Math.random() / 4; // This number is needed to break the repetition of bouncing

                // Collision from left
                if (prevX <= other[i].coll.x) {
                    this.speedX = -Math.abs(oldSpeedY) - random;
                }

                // Collision from right
                if (prevX >= other[i].coll.x) {
                    this.speedX = Math.abs(oldSpeedY) + random;
                }

                // Collision from top
                if (prevY <= other[i].coll.y) {
                    this.speedY = -Math.abs(oldSpeedX) - random;
                }

                // Collision from bottom
                if (prevY >= other[i].coll.y) {
                    this.speedY = Math.abs(oldSpeedX) + random;
                }

                // Wake the animation of the photon
                other[i].isHitAnimationNumber = 40;

                // Deduct life from the enemy with the same color
                if (this.power === other[i].tag) {
                    other[i].life--;

                    let Globals = Gate2D.Globals;

                    // Gain 75% of the energy back
                    Globals.energy += ~~(other[i].fullLife * 0.75) + 1;

                    Globals.score++;
                    break;
                }
            }

            // If there is collision with more than one object, break out and check again
            if (other.length > 1) {
                break;
            }
        }
    }

    // Reset the photon
    if (this.y > 1100) {
        this.x = this.initX;
        this.y = this.initY;
        this.speedX = 0;
        this.speedY = 0;
        this.power = 1;

        let cannon = Gate2D.Objects.get('cannon');
        cannon.charge = 0;
        this.hitX = this.initX + 16;
        this.hitY = this.initY + 16;
        this.hitOpacity = 0.75;

        // Wake up the levelUp event
        Gate2D.Misc.executeLevelup();
    }

    // Update the photon position
    this.x += this.speedX;
    this.y += this.speedY;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.width / 2);
}

Photon.prototype.fire = function (power) {
    // Save the beginning spot
    this.x = this.initX;
    this.y = this.initY;
    this.speedX = 0;
    this.speedY = 0;

    // Assign the power
    if (power >= 0 && power < 10) { this.power = 'green'; }
    if (power >= 10 && power < 20) { this.power = 'yellow'; }
    if (power >= 20 && power < 31) { this.power = 'red'; }

    // Get the direction from the cannon and assign the speed
    this.movement = Gate2D.Math.direction(Gate2D.Objects.get('cannon').direction + 270, 16 + power / 4);

    // Assign the new speed
    this.speedX = -this.movement.x;
    this.speedY = this.movement.y;
}