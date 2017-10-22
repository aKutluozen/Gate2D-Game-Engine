/**
 * cannon.js 
 * 
 * Cannon Class
 * Cannon object that is controlled by the player.
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

    this.clicked = false; // Control if the cannon is touched
    this.direction = 0; // Direction of the cannon
    this.input = { x: 360, y: 0 }; // The object that will save the x, y coordinates of the touch

    // Canon charge control
    this.isCharging = false; // True when charging
    this.overHeat = false; // Boolean that controls the overheat situation
    this.charge = 0; // The amount of charge - Also determines the related graphic

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

// Establish the inheritance
Cannon.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Cannon.prototype.draw = function () {
    this.ctx.save();

    // Rotation and drawing of the cannon
    this.ctx.translate(this.x - 24 + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(-this.direction * Math.PI / 180);
    this.ctx.translate(-(this.x - 24 + this.width / 2), -(this.y + this.height / 2));
    this.ctx.drawImage(this.img, 16, 160, 64, 256, this.x - 24, this.y, this.width, this.height);

    // Charging color change
    let red = 0, green = 255, blue = 0;
    if (this.isCharging) {
        red += this.charge * 4;
        green -= this.charge * 4;

        // Draw the guide line with the color
        this.ctx.fillStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.25)';
        this.ctx.fillRect(this.x -4, this.y, 24, -1000);
    }

    // Show the charging
    this.ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    this.ctx.fillRect(this.x, this.y + this.height / 3 + 3, this.width / 4, -this.charge);

    // Draw the box collision if needed
    this.coll.draw();

    this.ctx.restore();
}

Cannon.prototype.update = function () {
    let fireButton = Gate2D.Controls.getOnScreenButton('fireButton')

    // If charging mode is on, charge the cannon until it is 80
    if (this.isCharging && !this.overHeat) {
        this.charge += 0.5;

        // Overheating happens
        if (this.charge > 81) {
            this.overHeat = true;
        }
    }
    // Cool down the cannon when not using
    else if (!this.isCharging && !this.overHeat) {
        if (this.charge >= 0) {
            this.charge -= 0.25;
        }
    }

    // Handle the overheat problem
    if (this.overHeat) {
        // Disable the button until the cannon is cool again
        fireButton.status = 'disabled';

        // Keep incrementing the heat unless the player cools it down
        if (this.charge < 81) {
            this.charge += 0.25;

            // Everything turns back to normal when the cannon is cold enough
            if (this.charge < 5) {
                this.charge = 0;
                this.overHeat = false;
                this.isCharging = false;
                fireButton.status = 'active';
            }
        }
    }

    this.coll.update(this.x - 24, this.y); // Always update the collision area position
}

// Whenever a touch movement event is sent, response to it by holding the input (x and y values);
Cannon.prototype.handleMouseMovement = function (input) {
    this.input = input;
}

// Rotation of the cannon based on the input
Cannon.prototype.rotate = function () {
    this.direction = (this.input.x / (Gate2D.Video.getScreenWidth() / 360)) + 180;
}

// Toggle charging
Cannon.prototype.charging = function (bool) {
    this.isCharging = bool;
}

// Returns the power so the photon can use it
Cannon.prototype.power = function () {
    return this.charge;
}

// Cool down amount at each tap
Cannon.prototype.coolDown = function () {
    this.charge -= 5;
}