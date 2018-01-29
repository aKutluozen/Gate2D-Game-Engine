/**
 * Photon.js 
 * 
 * Photon Class
 * It is involved with a lot of game action since it is the main trajectory of the game
 * 
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  z - Z depth position of the entity
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
    this.initY = y - 4;

    // Hit positions for drawing trail
    this.hitX = this.initX + 8;
    this.hitY = this.initY + 8;
    this.hitOpacity = 0.75; // This will be recharged each time and will be reduced to 0 in drawing

    // Special power characteristics of the photon
    this.canBomb = false;
    this.blewUp = false;
    this.expSize = 0; // This will get bigger based on power purchases

    this.power = 0; // Power (color) of the photon

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width / 3);
    this.initR = this.coll.r; // Keep the initial radius to come back to it after explosion

    // If a rapid photon, don't be active yet
    if (this.tag.substring(0, 5) === 'rapid') {
        this.initX = 172;
        this.initY = 520;
        this.hitX = this.initX + 8;
        this.hitY = this.initY + 8;
        this.power = 'rapid';
    }

    this.active = false;

    // Temp lumen radius
    this.tempLumenRadius = 1;

    // Cache global object
    this.Globals = Gate2D.Globals;
}

// Establish the inheritance
Photon.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Photon.prototype.draw = function () {

    // Draw the photon only when it is moving
    if (this.speedX || this.speedY || this.power === 'wall') {

        // Draw trail
        if (this.power !== 'rapid') {
            this.ctx.beginPath();
            this.ctx.moveTo(~~this.hitX, ~~this.hitY);
            this.ctx.lineTo(~~(this.x + this.width / 2), ~~(this.y + this.width / 2));
            this.ctx.stroke();
            this.ctx.lineCap = "round";
            this.ctx.closePath();

            this.hitOpacity -= 0.035;
            this.ctx.lineWidth = this.hitOpacity * 16;
            if (this.hitOpacity <= 0.1) {
                this.hitOpacity = 0;
            }
        }

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
            case 'ghost': {
                this.ctx.drawImage(this.img, 192, 192, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(50, 100, 200, ' + this.hitOpacity + ')';
            } break;
            case 'bomb': {
                this.ctx.drawImage(this.img, 240, 224, 32, 32, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(255, 255, 50, ' + this.hitOpacity + ')';
            } break;
            case 'rapid': {
                this.ctx.drawImage(this.img, 96, 192, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.hitOpacity + ')';
            } break;
            case 'wall': {
                this.ctx.drawImage(this.img, 240, 224, 32, 32, ~~this.x, ~~this.y, this.width, this.height);
                this.ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.hitOpacity + ')';
            } break;
            default: {
                this.ctx.drawImage(this.img, 96, 160, 24, 24, ~~this.x, ~~this.y, this.width, this.height);
            } break;
        }
    }

    // Expand the explosion
    if (this.blewUp) {
        this.expSize += 1;
        if (this.expSize > 60 * this.Globals.maxLumenRadius) { // Limit the size here
            this.y = 600; // Send the photon away
            this.reset();
            // Give back the old lumen radius if blew up by speed
            this.Globals.maxLumenRadius = this.tempLumenRadius;
        }
        this.ctx.drawImage(this.img, 0, 464, 160, 160, ~~(this.x - this.expSize / 2) + 8, ~~(this.y - this.expSize / 2) + 8, this.expSize, this.expSize);
    }

    this.coll.draw();
}

Photon.prototype.update = function () {
    // If it is a bomb, radius grows.
    if (this.blewUp) {
        this.coll.r = this.expSize / 2;
    }

    // Save the previous spot - Will be used when checking collision from different angles
    let prevX = this.coll.x - this.speedX,
        prevY = this.coll.y - this.speedY;

    // Check around
    if (other = Gate2D.Physics.checkCollision(this)) {
        for (let i = 0, len = other.length; i < len; i++) {

            // Set the hit positions for drawing the tail - if not hitting each other!
            if (other[i].name != 'photon') {
                this.hitX = this.x + this.width / 2;
                this.hitY = this.y + this.height / 2;
                this.hitOpacity = 0.75;
            }

            if (other[i].name === 'wall' && !this.blewUp) {
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

                // If the photon only hits a wall, reduce the hit number               
                this.Globals.maxRicochets--;               

                // Make the photon disappear if it is wasted with useless ricochets
                if (this.Globals.maxRicochets <= 0) {
                    this.reset();
                }
            }

            if (other[i].name === 'enemy' && !other[i].isDead) {
                // Cache the old speed for swapping purposes
                let oldSpeedX = this.speedX,
                    oldSpeedY = this.speedY,
                    random = Math.random() / 2; // This number is needed to break the repetition of bouncing

                // Every color bounces but not ghost and bomb
                if (this.power !== 'ghost' && !this.canBomb) {
                    // Collision from left
                    if (prevX <= other[i].coll.x) {
                        this.speedX = -Math.abs(oldSpeedX) - random;
                    }

                    // Collision from right
                    if (prevX >= other[i].coll.x + other[i].coll.width) {
                        this.speedX = Math.abs(oldSpeedX) + random;
                    }

                    // Collision from top
                    if (prevY <= other[i].coll.y) {
                        this.speedY = -Math.abs(oldSpeedY) - random;
                    }

                    // Collision from bottom
                    if (prevY >= other[i].coll.y + other[i].coll.height) {
                        this.speedY = Math.abs(oldSpeedY) + random;
                    }
                }

                // If the photon hits an enemy, reset the max ricochet number
                this.Globals.maxRicochets = 8;

                // Build a wall 
                if (this.power === 'wall') {
                    this.speedX = 0;
                    this.speedY = 0;

                    // Build a wall object here, then reset the ball! Bring it from the ingame wall object
                    let wall = Gate2D.Objects.findByProperty('tag', 'photonWall');
                    wall.active = true;
                    this.Globals.isWallActive = true;
                    Gate2D.Objects.findByProperty('tag', 'photonWall').y = this.y;
                    this.Globals.wallY = this.y;
                    this.reset();
                }

                // Wake the animation of the photon
                other[i].isHitAnimationNumber = 20;

                // Kill everything if blew up
                if (this.blewUp) {
                    other[i].life = 0;

                    // Gain 75% of the energy back
                    this.Globals.energy += (~~(other[i].fullLife * other[i].fullLife) + 1 + other[i].bonusPower);
                    this.Globals.score += this.Globals.bonusMultiplier;
                }

                // Blow up if photon is a bomb
                if (this.canBomb) {
                    this.speedX = 0;
                    this.speedY = 0;
                    this.blewUp = true;
                }

                // Deduct life from the enemy with the same color
                if (
                    this.power === other[i].tag ||
                    other[i].tag === 'bonusPower' ||
                    other[i].tag === 'bonusMultiplier' ||
                    other[i].tag === 'bonusCool' ||
                    this.power === 'ghost' ||
                    this.power === 'rapid'
                ) {
                    // Gain 75% of the energy back
                    if (other[i].life == 1) {
                        this.Globals.energy += (1 + other[i].bonusPower);
                    } else {
                        this.Globals.energy += (~~(other[i].fullLife * 0.75) + other[i].bonusPower);
                    }

                    other[i].life--;

                    let cannon = Gate2D.Objects.get('cannon');

                    // Cooling down
                    if (other[i].tag === 'bonusCool' && cannon.heatSink > 0) {
                        if (cannon.heatSink - other[i].bonusCool >= 0) {
                            cannon.heatSink -= other[i].bonusCool;
                        } else {
                            cannon.heatSink = 0;
                        }
                    }

                    if (other[i].tag === 'bonusMultiplier') {
                        this.Globals.bonusMultiplier = other[i].bonusMultiplier;
                    }

                    this.Globals.score += this.Globals.bonusMultiplier;
                    this.Globals.sameColorHits++;

                    // Initiate the sam color hit bonus multiplier
                    if (this.Globals.sameColorHits >= 2) {
                        this.Globals.bonusMultiplier++;
                    }

                    break;
                }
            }

            // This is problematic !!!
            // If there is collision with more than one object, break out and check again
            if (other.length > 1) {
                // break;
            }
        }
    }

    // Blow up from too much speed!
    if (Math.abs(this.speedX) > 10 || Math.abs(this.speedY) > 10) {

        // Cache the old maxLumen value
        this.tempLumenRadius = this.Globals.maxLumenRadius;
        // Assign the temporary small lumen radius
        this.Globals.maxLumenRadius = 1;

        this.speedX = 0;
        this.speedY = 0;
        this.canBomb = true;
        this.blewUp = true;
    }

    // Reset the photon
    if (this.y > 550 || this.y < 0 || this.x > 375 || this.x < -15) {
        this.reset();
    }

    // Update the photon position
    this.x += this.speedX;
    this.y += this.speedY;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.width / 2);
}

Photon.prototype.fire = function (shootEnergy, direction) {
    // Save the beginning spot
    this.x = this.initX;
    this.y = this.initY;
    this.speedX = 0;
    this.speedY = 0;

    let cannon = Gate2D.Objects.get('cannon');

    // Assign the power
    if (shootEnergy >= 0 && shootEnergy < 10) { this.power = 'green'; }
    else if (shootEnergy >= 10 && shootEnergy < 20) { this.power = 'yellow'; }
    else if (shootEnergy >= 20 && shootEnergy < 31) { this.power = 'red'; }
    else if (shootEnergy === 'special') {
        if (cannon.isBombing) {
            this.power = 'bomb';
            this.canBomb = true;
        } else if (cannon.isBuildingWall) {
            this.power = 'wall';
        } else if (cannon.rapidFire) {
            this.power = 'rapid';
        } else {
            this.power = 'ghost';
        }
        shootEnergy = 8;
    }

    // Get the direction from the cannon and assign the speed
    this.movement = Gate2D.Math.direction(direction + 270, 5);

    // Assign the new speed
    this.speedX = -this.movement.x;
    this.speedY = this.movement.y;
    this.active = true;
}

Photon.prototype.reset = function () {
    let cannon = Gate2D.Objects.get('cannon');

    // No more a bomb
    if (this.blewUp) {
        this.expSize = 0;
        this.blewUp = false;
        this.canBomb = false;
        cannon.isBombing = false;
        cannon.canOverCharge = false;
    }

    // Reset position, speed and sizes
    this.x = this.initX;
    this.y = this.initY;
    this.hitX = this.initX + 8;
    this.hitY = this.initY + 8;
    this.speedX = 0;
    this.speedY = 0;
    this.coll.r = this.initR;
    this.Globals.maxRicochets = 8;

    // Reset the ball trail opacity
    this.hitOpacity = 0.75;

    // Reset rapid fire
    if (this.power === 'rapid') {
        this.Globals.rapidPhotonsActive--;
        if (this.Globals.rapidPhotonsActive === 0) {
            Gate2D.Misc.executeLevelup();
            cannon.rapidFire = false;
        }
    } else {
        // Wake up the levelUp event
        Gate2D.Misc.executeLevelup();
    }

    this.power = 0;
    this.active = false;
}