function Ball(x, y, z, width, height, name, tag, controlled) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image
    this.sprite = Loader.getFile('imgCharacter');

    // Define object specific properties
    this.speedX = 0;
    this.speedY = 0;

    this.controlled = true; // The object is controlled by input devices
    this.isJumping = false; // If the object is in the air, keeps it from jumping again
    this.isFalling = true; // When the head hits a platform
    this.yVelocity = 0; // This number is recharged and consumed every time player jumps
    this.jumpSpeed = 5; // Maximum speed for jump
    this.gravity = 0.25; // Gravity is added to the yVelocity until the max. jump speed 

    this.whatIsAroundMe = []; // An empty list of colliding surrounding objects

    // Define collision area if one is needed
    this.coll = new Physics.CircleCollision(x, y, z, width);

    this.animation = new Sprites.animation(12, 3);
}

// Establish the inheritance
Ball.prototype = new Entity();

// Define object methods
Ball.prototype.draw = function () {
    if (this.speedX > 0) {
        this.ctx.drawImage(this.sprite, this.animation.getFrame() * 16, 0, 16, 16, this.x, this.y, this.width, this.height);
    } else if (this.speedX < 0) {
        this.ctx.drawImage(this.sprite, this.animation.getFrame() * 16, 16, 16, 16, this.x, this.y, this.width, this.height);
    } else {
        this.ctx.drawImage(this.sprite, 0, 32, 16, 16, this.x, this.y, this.width, this.height);
    }
    this.coll.draw();
}

Ball.prototype.update = function () {
    // Always keep an updated list of what is around
    this.whatIsAroundMe = Physics.searchAround(this, this.whatIsAroundMe);

    // Gravity is always pulling down
    if (this.isFalling && this.yVelocity <= this.jumpSpeed - this.gravity) {
        this.yVelocity += this.gravity;
    }

    // Save the previous spot
    var prevX = this.coll.x - this.speedX;
    var prevY = this.coll.y - this.yVelocity;

    // If the object is supposed to respond to more than one instance, use a for loop
    for (var i = 0; i < this.whatIsAroundMe.length; i++) {
        var other = this.whatIsAroundMe[i];

        if (other.name === 'box') {
            // Collision from right
            if (prevX + this.coll.r <= other.coll.x) {
                this.x -= this.speedX;
                this.speedX = 0;
            }

            // Collision from left
            if (prevX - this.coll.r >= other.coll.x + other.coll.width) {
                this.x -= this.speedX;
                this.speedX = 0;
            }

            // Collision from top
            if (prevY + this.coll.r <= other.coll.y) {
                this.y = other.coll.y - this.coll.r * 2; // Place the player right on top of the platform
                this.yVelocity = 0; // Reset the jump speed to 0
                this.isJumping = false; // Not jumping anymore
                this.isFalling = false; // Not falling anymore
            }

            // Collision from bottom
            if (prevY - this.coll.r >= other.coll.y + other.coll.height) {
                this.isJumping = false; // Not jumping anymore
                this.isFalling = true; // Falling is happening, so the player can't jump
                this.yVelocity = this.gravity; // Make yVelocity a small positive number to initiate the falling
                this.y = other.coll.y + other.coll.height + Math.abs(this.yVelocity); // Place the player right under the platform
            }
        } else {
            this.isFalling = true;
        }
    }

    // Fall if there is nothing to hold on to
    if (this.whatIsAroundMe.length === 0) {
        this.isFalling = true;
    }

    this.x += this.speedX;
    this.y += this.yVelocity;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2);
}

Ball.prototype.handleMouseMovement = function (input) {
    this.movement = input;
}

Ball.prototype.handleKeyDown = function (input) {
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

Ball.prototype.handleKeyUp = function (input) {
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