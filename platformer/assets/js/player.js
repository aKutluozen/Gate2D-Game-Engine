function Player(x, y, z, width, height, name, tag, controlled) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.sprite = Gate2D.Loader.getFile('imgCharacter');

    // Define object specific properties
    this.speedX = 0;
    this.speedY = 0;

    this.controlled = true; // The object is controlled by input devices
    this.isJumping = false; // If the object is in the air, keeps it from jumping again
    this.isFalling = true; // When the head hits a platform
    this.yVelocity = 0; // This number is recharged and consumed every time player jumps
    this.jumpSpeed = 5; // Maximum speed for jump
    this.gravity = 0.25; // Gravity is added to the yVelocity until the max. jump speed 

    // Define collision area if one is needed
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width);

    this.animation = new Gate2D.Sprites.animation(12, 3);
}

// Establish the inheritance
Player.prototype = new Gate2D.Entity();

// Define object methods
Player.prototype.draw = function () {
    if (this.speedX > 0) {
        this.ctx.drawImage(this.sprite, this.animation.getFrame() * 16, 0, 16, 16, this.x, this.y, this.width, this.height);
    } else if (this.speedX < 0) {
        this.ctx.drawImage(this.sprite, this.animation.getFrame() * 16, 16, 16, 16, this.x, this.y, this.width, this.height);
    } else {
        this.ctx.drawImage(this.sprite, 0, 32, 16, 16, this.x, this.y, this.width, this.height);
    }
    this.coll.draw();
}

Player.prototype.update = function () {

    // Gravity is always pulling down
    if (this.isFalling && this.yVelocity <= this.jumpSpeed - this.gravity) {
        this.yVelocity += this.gravity;
    }

    // Save the previous spot
    let prevX = this.coll.x - this.speedX,
        prevY = this.coll.y - this.yVelocity;

    if (other = Gate2D.Physics.checkCollision(this)) {
        //Fall if there is nothing to hold on to
        if (other.length === 0) {
            this.isFalling = true;
        } else {
            for (let i = 0, len = other.length; i < len; i++) {

                if (other[i].name === 'box') {
                    // Collision from right
                    if (prevX + this.coll.r <= other[i].coll.x) {
                        this.x -= this.speedX;
                        this.speedX = 0;
                    }

                    // Collision from left
                    if (prevX - this.coll.r >= other[i].coll.x + other[i].coll.width) {
                        this.x -= this.speedX;
                        this.speedX = 0;
                    }

                    // Collision from top
                    if (prevY + this.coll.r <= other[i].coll.y) {
                        this.y = other[i].coll.y - this.coll.r * 2; // Place the player right on top of the platform
                        this.yVelocity = 0; // Reset the jump speed to 0
                        this.isJumping = false; // Not jumping anymore
                        this.isFalling = false; // Not falling anymore
                    }

                    // Collision from bottom
                    if (prevY - this.coll.r >= other[i].coll.y + other[i].coll.height) {
                        this.isJumping = false; // Not jumping anymore
                        this.isFalling = true; // Falling is happening, so the player can't jump
                        this.yVelocity = this.gravity; // Make yVelocity a small positive number to initiate the falling
                        this.y = other[i].coll.y + other[i].coll.height + Math.abs(this.yVelocity); // Place the player right under the platform
                    }
                } else {
                    this.isFalling = true;
                }
            }
        }
    }

    this.x += this.speedX;
    this.y += this.yVelocity;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2);
}

Player.prototype.handleKeyDown = function (input) {
    if (input === 39) {
        this.speedX = 1;
    }
    if (input === 37) {
        this.speedX = -1;
    }
    if (input === 38) {
        this.speedY = -2;
    }
    if (input === 40) {
        this.speedY = 2;
    }
    if (input === 32 && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
        this.yVelocity = -this.jumpSpeed;
    }
    this.animation.play();
}

Player.prototype.handleKeyUp = function (input) {
    if (input === 39) {
        this.speedX = 0;
    }
    if (input === 37) {
        this.speedX = 0;
    }
    if (input === 38) {
        this.speedY = 0;
    }
    if (input === 40) {
        this.speedY = 0;
    }
    this.animation.stop();
}