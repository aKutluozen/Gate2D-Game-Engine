/**
 * enemy.js 
 * 
 * Enemy Class
 * Colorful enemies that are waiting for photon to destroy them. The photon bounces off of them.
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
function Enemy(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image
    this.direction = 0;
    this.checkedCollision = false;
    this.isHitAnimationNumber = 0;
    this.isDead = false;
    this.bonusPower = 0;
    this.bonusCool = 0;
    this.bonusMultiplier = 0;
    this.active = true;

    // Assign lives randomly within certain ranges
    switch (this.tag) {
        case 'green': this.life = Gate2D.Math.randomNumber(1, 4); break;
        case 'yellow': this.life = Gate2D.Math.randomNumber(4, 7); break;
        case 'red': this.life = Gate2D.Math.randomNumber(7, 11); break;
        case 'bonusPower': this.life = 1; break;
        case 'bonusCool': this.life = 1; break;
        case 'bonusMultiplier': this.life = 1; break;
        default: break;
    }

    this.fullLife = this.life;
    this.isHittingOther = false;

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width - 1, height - 1);
}

// Establish the inheritance
Enemy.prototype = new Gate2D.Entity();

// Define object main methods draw and update
Enemy.prototype.draw = function () {
    // Draw them only when they are alive and in the screen
    if (this.y > 0) {
        this.ctx.save();

        // Handle the hit animation
        if (!this.isDead) {
            if (this.isHitAnimationNumber >= 0) {
                this.isHitAnimationNumber -= 0.5;
            }
        } else {
            this.isHitAnimationNumber += 2;
            this.ctx.globalAlpha = 1 - this.isHitAnimationNumber / (this.width * 4);

            // Send them outside the screen when they are dead
            if (this.isHitAnimationNumber >= this.width * 4) {
                this.y = -300;
                this.ctx.globalAlpha = 0;
                this.active = false;
            }
        }

        // Select a color based on the tag
        switch (this.tag) {
            case 'green': {
                this.ctx.fillStyle = "green";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                // this.ctx.drawImage(this.img, 192, 160, 32, 32,
                //     ~~this.x - this.isHitAnimationNumber / 2,
                //     ~~this.y - this.isHitAnimationNumber / 2,
                //     this.width + this.isHitAnimationNumber,
                //     this.height + this.isHitAnimationNumber);
            } break;
            case 'yellow': {
                this.ctx.fillStyle = "yellow";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                // this.ctx.drawImage(this.img, 192, 160, 32, 32,
                //     ~~this.x - this.isHitAnimationNumber / 2,
                //     ~~this.y - this.isHitAnimationNumber / 2,
                //     this.width + this.isHitAnimationNumber,
                //     this.height + this.isHitAnimationNumber);
            } break;
            case 'red': {
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                // this.ctx.drawImage(this.img, 192, 160, 32, 32,
                //     ~~this.x - this.isHitAnimationNumber / 2,
                //     ~~this.y - this.isHitAnimationNumber / 2,
                //     this.width + this.isHitAnimationNumber,
                //     this.height + this.isHitAnimationNumber);
            } break;
            case 'bonusPower': {
                this.ctx.drawImage(this.img, 464, 160, 80, 80,
                    ~~this.x - this.isHitAnimationNumber / 2,
                    ~~this.y - this.isHitAnimationNumber / 2,
                    this.width + this.isHitAnimationNumber,
                    this.height + this.isHitAnimationNumber);
            } break;
            case 'bonusCool': {
                this.ctx.drawImage(this.img, 464, 160, 80, 80,
                    ~~this.x - this.isHitAnimationNumber / 2,
                    ~~this.y - this.isHitAnimationNumber / 2,
                    this.width + this.isHitAnimationNumber,
                    this.height + this.isHitAnimationNumber);
            } break;
            case 'bonusMultiplier': {
                this.ctx.drawImage(this.img, 464, 160, 80, 80,
                    ~~this.x - this.isHitAnimationNumber / 2,
                    ~~this.y - this.isHitAnimationNumber / 2,
                    this.width + this.isHitAnimationNumber,
                    this.height + this.isHitAnimationNumber);
            } break;
            default: break;
        }

        this.ctx.restore();

        if (!this.isDead) {
            Gate2D.Video.drawText(this.life, "Photon", (20 + this.life * 3), "rgba(0, 0, 0, 0.5)", ~~this.x + this.width / 2, ~~this.y + this.height / 2 - 16 - this.life * 1.5, "center", false);
        }

        if (this.tag === 'bonusPower' && !this.isDead) {
            Gate2D.Video.drawText('+' + this.bonusPower, "Photon", 32, "rgba(255, 255, 255, 1)", ~~this.x + this.width / 2, ~~this.y + this.height / 2 - 16 - this.life * 1.5, "center", false);
        }

        if (this.tag === 'bonusCool' && !this.isDead) {
            Gate2D.Video.drawText('-' + this.bonusCool, "Photon", 32, "rgba(255, 255, 255, 1)", ~~this.x + this.width / 2, ~~this.y + this.height / 2 - 16 - this.life * 1.5, "center", false);
        }

        if (this.tag === 'bonusMultiplier' && !this.isDead) {
            Gate2D.Video.drawText('x' + this.bonusMultiplier, "Photon", 32, "rgba(255, 255, 255, 1)", ~~this.x + this.width / 2, ~~this.y + this.height / 2 - 16 - this.life * 1.5, "center", false);
        }

        this.coll.draw();
    }
}

Enemy.prototype.update = function () {
    // Move down enemies when needed
    if (Gate2D.Globals.levelUp) {
        if (!Gate2D.Globals.isWallActive) {
            this.y += 0.25;
        } else {
            if (this.y < Gate2D.Globals.wallY - 16 || this.y > Gate2D.Globals.wallY) {
                this.y += 0.25;
            }
        }
    }

    if (!this.isDead) {
        if (this.life < 1) {
            this.isDead = true;
            this.x = -400;
            this.y = -400;
        }
    }

    // Handle game over if the enemies are so close to the player
    if (this.y + this.height >= 544 && !this.isDead) {
        Gate2D.Manager.gameStatus('over');
    }

    // Check the collisions only when in screen - This check will happen only once for game start
    if (this.y > 0 && !this.checkedCollision) {

        // Don't let touch to other enemies
        if (other = Gate2D.Physics.checkCollision(this)) {
            if (!Gate2D.Globals.isWallActive) {
                for (let i = 0, len = other.length; i < len; i++) {
                    if (other[i].name === 'enemy') {
                        this.y = -800;
                        break;
                    }
                }
                // Don't run the loop again
                this.checkedCollision = true;
            } 
        }
        // Don't let it get out from the screen
        if (this.x + this.width >= Gate2D.Video.getScreenWidth()) {
            this.x = Gate2D.Video.getScreenWidth() - this.width;
        }
    }

    // Check for collision with other enemies when the wall is on
    if (Gate2D.Globals.isWallActive) {
        if (other = Gate2D.Physics.checkCollision(this)) {
            for (let i = 0, len = other.length; i < len; i++) {
                if (other[i].name === 'enemy') {
                    if (this.y <= other[i].y) {
                        this.y -= 1;
                    }
                }
            }
        }
    }

    // Always update the collision area position
    this.coll.update(this.x, this.y);
}