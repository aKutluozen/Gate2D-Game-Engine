function Ball(x, y, z, width, height, name, tag, controlled) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image
    
    // Define object specific properties
    this.speedX = -2;
    this.speedY = -2;
    this.controlled = true;

    // Define collision area if one is needed
    this.coll = new Physics.CircleCollision(x, y, z, width);

    this.whatIsAroundMe = [];
}

// Establish the inheritance
Ball.prototype = new Entity();

// Define object methods
Ball.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Ball.prototype.update = function () {
    whatIsAroundMe = Physics.searchAround(this); // Always keep an updated list of what is around
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2); // Always update the collision area position

    if (other = Physics.isTouching(whatIsAroundMe, 'wall')) {
    }

    if (other = Physics.isTouching(whatIsAroundMe, 'box')) {
    }
}

Ball.prototype.handleMouseMovement = function (input) {
    this.x = input.x;
    this.y = input.y;
}
