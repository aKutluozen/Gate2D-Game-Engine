function Ball(x, y, z, width, height, name, tag, controlled) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speedX = 0;
    this.speedY = 0;

    this.controlled = true;
    this.isJumping = false;
    this.isFalling = false; // When the head hits a platform
    this.yVelocity = 0; // This number is recharged and consumed every time player jumps
    this.jumpSpeed = 6;
    this.gravity = 0.25;

    this.whatIsAroundMe = [];

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
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2); // Always update the collision area position

    this.x += this.speedX;
    this.y += this.yVelocity;

    if (this.yVelocity <= this.jumpSpeed) {
        this.yVelocity += this.gravity;
    }

    //console.log(this.whatIsAroundMe);
    if (other = Physics.isTouching(this.whatIsAroundMe, 'box')) {
        // Check if the platform is under the player
        if (this.coll.y + this.coll.r >= other.coll.y) {
            this.yVelocity = 0; // Reset the jump speed to 0
            this.isJumping = false; // Not jumping anymore
            this.isFalling = false; // Not fallign anymore
            this.y = other.coll.y - this.coll.r * 2; // Place the player right on top of the platform
        }
        // Check if the platform is over the player
        if (this.coll.y >= other.coll.y + other.coll.height) {
            this.isJumping = false;
            this.isFalling = true;
            this.y = other.coll.y + other.coll.height + 1; // Place the player right under the platform
        }

        // Check for left and right
    }
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
        this.y -= 1;
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