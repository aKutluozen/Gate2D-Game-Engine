/**
 * enemy.js 
 * 
 * Enemy Class
 * Colorful enemies that are waiting for photon to destroy them. The photon bounces off of them.
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
function Enemy(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image
    this.direction = 0;
    this.checkedCollision = false;
    this.isHitAnimationNumber = 0;
    this.isDead = false;

    // Assign lives
    switch (this.tag) {
        case 'green': this.life = 2; break;
        case 'yellow': this.life = 2; break;
        case 'red': this.life = 2; break;
        default: break;
    }

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width, height);
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
            }
        }

        // Rotate them slowly
        this.ctx.translate(~~this.x + 4 + this.width / 2, ~~this.y + this.height / 2);
        this.ctx.rotate(~~this.direction++ % 360 * Math.PI / 180);
        this.ctx.translate(-(~~this.x + 4 + this.width / 2), -(~~this.y + this.height / 2));

        // Select a color based on the tag
        switch (this.tag) {
            case 'green': {
                this.ctx.drawImage(this.img, 192, 160, 32, 32,
                    ~~this.x - this.isHitAnimationNumber / 2,
                    ~~this.y - this.isHitAnimationNumber / 2,
                    this.width + this.isHitAnimationNumber,
                    this.height + this.isHitAnimationNumber);
            } break;
            case 'yellow': {
                this.ctx.drawImage(this.img, 240, 160, 64, 64,
                    ~~this.x - this.isHitAnimationNumber / 2,
                    ~~this.y - this.isHitAnimationNumber / 2,
                    this.width + this.isHitAnimationNumber,
                    this.height + this.isHitAnimationNumber);
            } break;
            case 'red': {
                this.ctx.drawImage(this.img, 320, 160, 128, 128,
                    ~~this.x - this.isHitAnimationNumber / 2,
                    ~~this.y - this.isHitAnimationNumber / 2,
                    this.width + this.isHitAnimationNumber,
                    this.height + this.isHitAnimationNumber);
            } break;
            default: break;
        }

        this.ctx.restore();

        Gate2D.Video.drawText(this.life, "Comic Sans MS", 'bold ' + (20 + this.life * 3), "rgba(0, 0, 0, 0.5)", ~~this.x + this.width / 2, ~~this.y + this.height / 2 - 16 - this.life * 3, "center", false);

        // this.ctx.drawImage(this.img, 192, 160, 32, 32, this.x, this.y, this.width, this.height);
        this.coll.draw();
    }
}

Enemy.prototype.update = function () {
    // Move down enemies when needed
    if (Gate2D.Globals.levelUp) {
        this.y += 0.25;
    }

    if (!this.isDead) {
        if (this.life < 1) {
            this.isDead = true;
        }
    }

    // Handle game over if the enemies are so close to the player
    if (this.y + this.height >= 1088) {
        Gate2D.Manager.gameStatus('over');
    }

    // Check the collisions only when in screen - This check will happen only once
    if (this.y > 0 && !this.checkedCollision) {

        // Don't let touch to other enemies
        if (other = Gate2D.Physics.checkCollision(this)) {
            for (let i = 0, len = other.length; i < len; i++) {
                if (other[i].name === 'enemy') {
                    this.y = -800;
                    break;
                }
            }
            // Don't run the loop again
            this.checkedCollision = true;
        }
        // Don't let it get out from the screen
        if (this.x + this.width >= Gate2D.Video.getScreenWidth()) {
            this.x = Gate2D.Video.getScreenWidth() - this.width;
        }
    }

    this.coll.update(this.x + this.width / 2, this.y + this.height / 2); // Always update the collision area position
}