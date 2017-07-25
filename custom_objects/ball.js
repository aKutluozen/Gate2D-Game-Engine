function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speed = 4;
    this.controlled = true;

    // Define collision area if one is needed
    this.coll = new Physics.CircleCollision(x, y, width);
}

// Establish the inheritance
Ball.prototype = new Entity();

// Define object methods
Ball.prototype.draw = function () {
    this.coll.draw();
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Ball.prototype.update = function () {
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2); // Always update the collision area position

    if (Objects.point) {
        if (this.coll.checkCollision(this, Objects.point)) {
            this.collided = true;
        } else {
            this.collided = false;
            Physics.moveTowards(this, Objects.point);
        }
    }
}

Ball.prototype.handleKeyDown = function (input) {
    if (input == 37) {
        this.x -= this.speed;
    }
    if (input == 39) {
        this.x += this.speed;
    }
    if (input == 40) {
        this.y += this.speed;
    }
    if (input == 38) {
        this.y -= this.speed;
    }
}
