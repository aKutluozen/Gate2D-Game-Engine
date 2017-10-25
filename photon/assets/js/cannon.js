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
    this.charge = 0; // The amount of charge
    this.heatSink = 0; // Accumuluates until it overheats and relaxes
    this.isFiring = false; // Controls the fire animation
    this.fireAnimation = 0; // The length of the fire animation
    this.jitter = 0; // Shake when overheating

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
    this.ctx.drawImage(this.img, 16, 160, 64, 256, this.x - 24, this.y + this.fireAnimation / 32, this.width, this.height);

    // Draw the normal guide line
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.fillRect(this.x + 7, this.y, 1, -1000);

    // Handle firing fire animation
    if (this.isFiring) {
        if (this.fireAnimation < 128) {
            this.fireAnimation += 16;
        } else {
            this.isFiring = false;
            this.fireAnimation = 0;
        }
        console.log(this.charge);
        if (this.charge >= 0 && this.charge < 10) {
            this.ctx.drawImage(this.img, 96, 192, 32, 160, this.x - 24, this.y - this.fireAnimation * 1.5 + 16, this.width, this.fireAnimation * 1.5);
        } else if (this.charge >= 10 && this.charge < 20) {
            this.ctx.drawImage(this.img, 128, 192, 32, 160, this.x - 24, this.y - this.fireAnimation * 1.5 + 16, this.width, this.fireAnimation * 1.5);
        } else if (this.charge >= 20 && this.charge < 31) {
            this.ctx.drawImage(this.img, 160, 192, 32, 160, this.x - 24, this.y - this.fireAnimation * 1.5 + 16, this.width, this.fireAnimation * 1.5);
        }
    }

    // Charging color change
    let red = 0, green = 255, blue = 0;
    if (this.isCharging) {
        red += this.heatSink * 4;
        green -= this.heatSink * 4;

        // Draw the guide line with the color
        if (!this.overHeat) {
            this.ctx.fillStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.5)';
            this.ctx.fillRect(~~(this.x + 8 - ~~(4 * (red / 100))), ~~(this.y), ~~(8 * (red / 100)), -1000);
        }
    }

    // Show the charging number
    // Gate2D.Video.drawText(~~(this.charge), 'Impact', 36, "white", this.x + 6, this.y + this.height / 2 - 22, "center", false);

    // Show the charging
    this.ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    this.ctx.fillRect(~~this.x, ~~(this.y + this.height / 3 + 3), this.width / 4, -(~~this.heatSink * 0.8));

    // Draw the box collision if needed
    this.coll.draw();

    this.ctx.restore();
}

Cannon.prototype.update = function () {
    let fireButton = Gate2D.Controls.getOnScreenButton('fireButton');

    // If charging mode is on, charge the cannon until it is 100
    if (this.isCharging && !this.overHeat) {
        this.heatSink += 0.25;
        this.charge += 0.25;

        // Overheating happens
        if (this.heatSink > 100) {
            this.overHeat = true;
        }
    }

    // Handle the overheat problem
    if (this.overHeat) {
        Gate2D.Globals.levelUp = true;
        // Disable the button until the cannon is cool again
        fireButton.status = 'disabled';
        
        this.direction += Math.sin(this.jitter++) * 2;

        // Keep incrementing the heat unless the player cools it down
        if (this.heatSink < 100) {
            this.heatSink += 0.25;

            // Everything turns back to normal when the cannon is cold enough
            if (this.heatSink < 5) {
                this.heatSink = 0;
                this.overHeat = false;
                this.isCharging = false;
                Gate2D.Globals.levelUp = false;
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
    this.heatSink -= 5;
}