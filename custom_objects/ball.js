function Ball(x, y, z, width, height, name, tag, controlled) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speedX = 0;
    this.speedY = 0;
    this.controlled = true;
    this.isJumping = false;
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
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2); // Always update the collision area position
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.isJumping) {
        this.jumpSpeed -= this.gravity;
        this.y -= this.jumpSpeed;
    }

    this.whatIsAroundMe = Physics.searchAround(this, this.whatIsAroundMe); // Always keep an updated list of what is around

    if (other = Physics.isTouching(this.whatIsAroundMe, 'box')) {
        if (this.coll.y + this.coll.width >= other.coll.y) {
            this.jumpSpeed = 6; // Reset the jump speed
            this.isJumping = false;
            //this.y -= this.jumpSpeed;
        }
    } else {
        if (!this.isJumping) {
            this.y += this.jumpSpeed;
        }
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
    if (input === 32 && !this.isJumping) {
        this.isJumping = true;
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