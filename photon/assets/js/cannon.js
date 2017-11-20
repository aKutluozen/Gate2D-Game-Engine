/**
 * cannon.js 
 * 
 * Cannon Class
 * Cannon object that is controlled by the player.
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
function Cannon(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image
    this.active = true;

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
    this.chargeColor = 'lightgreen'; // Charge color
    this.chargeAnimationDirection = 0;
    this.canOverCharge = false; // Determines if the cannon can shoot an overcharged attack
    this.isBombing = false; // Determines if the cannon can send bombs
    this.specialFire = false; // Determines if a special firing is happening

    this.red = 0;
    this.green = 255;

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
    this.ctx.drawImage(this.img, 16, 160, 64, 256, ~~(this.x - 24), ~~(this.y + this.fireAnimation / 32), this.width, this.height);

    // Draw the normal guide line
    // this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    // this.ctx.fillRect(this.x + 7, this.y, 2, -1000);

    // Handle firing fire animation
    if (this.isFiring) {
        if (this.fireAnimation < 128) {
            this.fireAnimation += 16;
        } else {
            this.isFiring = false;
            this.fireAnimation = 0;
        }
        // Show the right color of fire
        if (this.charge >= 0 && this.charge < 11) {
            this.ctx.drawImage(this.img, 96, 224, 32, 128, this.x - 24, ~~(this.y - this.fireAnimation * 1.5 + 16), this.width, ~~(this.fireAnimation * 1.5));
        } else if (this.charge >= 11 && this.charge < 21) {
            this.ctx.drawImage(this.img, 128, 224, 32, 128, this.x - 24, ~~(this.y - this.fireAnimation * 1.5 + 16), this.width, ~~(this.fireAnimation * 1.5));
        } else if (this.charge >= 21 && this.charge < 31) {
            this.ctx.drawImage(this.img, 160, 224, 32, 128, this.x - 24, ~~(this.y - this.fireAnimation * 1.5 + 16), this.width, ~~(this.fireAnimation * 1.5));
        } else if (this.charge >= 31 && this.charge < 51) {
            if (this.isBombing) {
                this.ctx.drawImage(this.img, 160, 224, 32, 128, this.x - 24, ~~(this.y - this.fireAnimation * 1.5 + 16), this.width, ~~(this.fireAnimation * 1.5));
            } else {
                this.ctx.drawImage(this.img, 192, 224, 32, 128, this.x - 24, ~~(this.y - this.fireAnimation * 1.5 + 16), this.width, ~~(this.fireAnimation * 1.5));
            }
        }
    }

    // Show the overheat
    this.ctx.fillStyle = 'rgb(220, 40, 40)';
    this.ctx.fillRect(~~this.x, ~~(this.y + this.height / 3 + 3 + this.fireAnimation / 32), this.width / 4, -(~~this.heatSink * 0.8));

    // Charging animation
    if (this.isCharging && !this.overHeat) {
        this.ctx.save();

        this.ctx.translate(this.x - 24 + this.width / 2, this.y + this.height / 2);
        this.ctx.rotate(-this.chargeAnimationDirection * Math.PI / 180);
        this.ctx.translate(-(this.x - 24 + this.width / 2), -(this.y + this.height / 2));
        this.chargeAnimationDirection += 20 + this.charge;
        this.chargeAnimationDirection %= 360;

        // Spinning energy animation
        if (this.charge > 0 && this.charge < 10) {
            this.chargeColor = 'rgba(190, 255, 50, 0.75)';
            this.ctx.drawImage(this.img, 96, 368, 96, 96, this.x - 28, this.y + 64, 96, 96);
        } else if (this.charge >= 10 && this.charge < 20) {
            this.chargeColor = 'rgba(255, 255, 50, 0.75)';
            this.ctx.drawImage(this.img, 192, 368, 96, 96, this.x - 28, this.y + 64, 96, 96);
        } else if (this.charge >= 20 && this.charge < 31) {
            this.chargeColor = 'rgba(255, 50, 50, 0.75)';
            this.ctx.drawImage(this.img, 288, 368, 96, 96, this.x - 28, this.y + 64, 96, 96);
        } else if (this.charge >= 31 && this.charge < 51) {
            if (!this.isBombing) {
                this.chargeColor = 'rgba(50, 100, 200, 0.75)';
                this.ctx.drawImage(this.img, 384, 368, 96, 96, this.x - 28, this.y + 64, 96, 96);
            } else {
                this.chargeColor = 'rgba(255, 50, 50, 0.75)';
                this.ctx.drawImage(this.img, 288, 368, 96, 96, this.x - 28, this.y + 64, 96, 96);
                this.ctx.drawImage(this.img, 192, 368, 96, 96, this.x - 28, this.y + 64, 96, 96);
            }
        } else {
            this.chargeColor = 'rgba(0, 0, 0, 0.5)';
        }
        this.ctx.restore();

        // Show the charging in three colors
        this.ctx.fillStyle = this.chargeColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x + 8, ~~(this.y + this.height / 2 + 2 + this.fireAnimation / 32), 16 * this.charge / 20, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    // Overheat coloring
    if (this.overHeat) {
        this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        this.ctx.beginPath();
        this.ctx.arc(this.x + 8, ~~(this.y + this.height / 2 + 2 + this.fireAnimation / 32), 32, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    // Draw the box collision if needed
    this.coll.draw();

    this.ctx.restore();
}

Cannon.prototype.update = function () {
    let fireButton = Gate2D.Controls.getOnScreenButton('fireButton'),
        specialButton = Gate2D.Controls.getOnScreenButton('specialButton'),
        chooseButton = Gate2D.Controls.getOnScreenButton('chooseButton');

    // If charging mode is on, charge the cannon until it is 100
    if (this.isCharging && !this.overHeat) {
        if (!this.canOverCharge) {
            if (this.charge < 30) {
                this.charge += 0.25;
            }
        } else {
            if (this.charge < 50) {
                this.charge += 0.25;
            }
        }

        this.direction += Math.sin(this.jitter++ % 360) * 1;
    }

    // Overheating happens
    if (this.heatSink > 99) {
        this.overHeat = true;
    }

    // Handle the overheat problem
    if (this.overHeat) {
        Gate2D.Globals.levelUp = true;
        // Disable the button until the cannon is cool again
        fireButton.status = 'disabled';
        specialButton.status = 'disabled';
        chooseButton.status = 'disabled';

        this.direction += Math.sin(this.jitter++) * 1;

        // Keep incrementing the heat unless the player cools it down
        if (this.heatSink < 100) {
            this.heatSink += 0.35;

            // Everything turns back to normal when the cannon is cold enough
            if (this.heatSink < 5) {
                this.heatSink = 0;
                this.overHeat = false;
                this.isCharging = false;
                Gate2D.Globals.levelUp = false;
                fireButton.status = 'active';
                specialButton.status = 'active';
                chooseButton.status = 'active';
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
    if (this.overHeat) {
        this.heatSink -= 7;
    }
}

// Releases the power of the cannon to the photon, disables the fire button momentarily
Cannon.prototype.fire = function (isSpecial) {
    var fireButton = Gate2D.Controls.getOnScreenButton('fireButton'),
        specialButton = Gate2D.Controls.getOnScreenButton('specialButton'),
        chooseButton = Gate2D.Controls.getOnScreenButton('chooseButton');

    // Handle special attack differently
    if (isSpecial) {
        Gate2D.Objects.get('photon').fire('special');
        return;
    }

    if (!this.overHeat) {
        if (this.charge <= Gate2D.Globals.energy) {
            this.isCharging = false; // Release the cannon
            Gate2D.Objects.get('photon').fire(this.charge); // Fire the photon with cannon power
            this.isFiring = true; // Trigger the animation

            // Pass the charging energy to overheat
            if (this.charge > 0 && this.charge < 10) {
                Gate2D.Globals.energy -= 10;
                this.heatSink += 5;
            } else if (this.charge >= 10 && this.charge < 20) {
                Gate2D.Globals.energy -= 20;
                this.heatSink += 10;
            } else if (this.charge >= 20 && this.charge < 31) {
                Gate2D.Globals.energy -= 30;
                this.heatSink += 15;
            } else if (this.charge >= 31 && this.charge < 51) {
                Gate2D.Globals.energy -= 50;
                this.heatSink += 20;
            }

            fireButton.status = 'disabled'; // Disable the fire button until the photon is out
            specialButton.status = 'disabled'; // Disable the fire button until the photon is out
            chooseButton.status = 'disabled'; // Disable the fire button until the photon is out
        }
        else {
            this.isCharging = false;
            this.charge = 0;
            Gate2D.Misc.executeLevelup();
        }
    }
}

// Charges the cannon if not overheating
Cannon.prototype.chargeIt = function () {
    if (!this.overHeat) {
        this.charge = 0;
        this.isCharging = true; // Charge the cannon
    }
}