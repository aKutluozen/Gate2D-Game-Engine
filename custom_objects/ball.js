function Ball(x, y, z, width, height, name, tag, controlled) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speedX = 0;
    this.speedY = 0;

    this.controlled = true; // The object is controlled by input devices
    this.isJumping = false; // If the object is in the air, keeps it from jumping again
    this.isFalling = false; // When the head hits a platform
    this.yVelocity = 0; // This number is recharged and consumed every time player jumps
    this.jumpSpeed = 6; // Maximum speed for jump
    this.gravity = 0.25; // Gravity is added to the yVelocity until the max. jump speed 

    this.whatIsAroundMe = []; // An empty list of colliding surrounding objects

    // Define collision area if one is needed
    this.coll = new Physics.CircleCollision(x, y, z, width);
}

// Establish the inheritance
Ball.prototype = new Entity();

// Define object methods
Ball.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Ball.prototype.update = function () {
    // Always keep an updated list of what is around
    this.whatIsAroundMe = Physics.searchAround(this, this.whatIsAroundMe);

    // Gravity is always pulling down
    if (this.isFalling && this.yVelocity <= this.jumpSpeed - this.gravity) {
        this.yVelocity += this.gravity;
    }

    //console.log(this.x, this.coll.x, this.y, this.coll.y);
    if (other = Physics.isTouching(this.whatIsAroundMe, 'box')) {

        // Check for vertical movement
        if (Math.abs(this.yVelocity) > 0) {
            // Check if the platform is under the player as a thin line
            if (
                this.coll.y + this.coll.r + this.yVelocity >= other.coll.y &&
                this.coll.y + this.coll.r < other.coll.y + other.coll.height / 2
            ) {
                this.yVelocity = 0; // Reset the jump speed to 0
                this.isJumping = false; // Not jumping anymore
                this.isFalling = false; // Not falling anymore
                this.y = other.coll.y - this.coll.r * 2; // Place the player right on top of the platform
                console.log('standing on platform');
            }

            // Check if the platform is over the player
            if (
                this.coll.y - this.coll.r - Math.abs(this.yVelocity) <= other.coll.y + other.coll.height &&
                this.coll.y - this.coll.r > other.coll.y + other.coll.height - Math.abs(this.yVelocity)
            ) {
                console.log('falling');
                this.isJumping = false; // Not jumping anymore
                this.isFalling = true; // Falling is happening, so the player can't jump
                this.yVelocity = this.gravity; // Make yVelocity a small positive number to initiate the falling
                this.y = other.coll.y + other.coll.height + Math.abs(this.yVelocity); // Place the player right under the platform
            }
        }

        // Make sure the wall is on the same level
        if (
            this.coll.y - this.coll.r >= other.coll.y &&
            this.coll.y + this.coll.r <= other.coll.y + other.coll.height
        ) {
            this.speedX = 0;
        }

    } else {
        this.isFalling = true;
    }

    this.x += this.speedX;
    this.y += this.yVelocity;
    //this.y += this.speedY;
    // this.x = this.movement.x;
    // this.y = this.movement.y;

    // Always update the collision area position and center it based on the object position
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2);
}

Ball.prototype.handleMouseMovement = function (input) {
    this.movement = input;
}

Ball.prototype.handleKeyDown = function (input) {
    if (input === 39) {
        this.speedX = 2;
    }
    if (input === 37) {
        this.speedX = -2;
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
}