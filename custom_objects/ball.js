function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speedX = 2;
    this.speedY = 2;

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
    this.x += this.speedX;
    this.y += this.speedY;

    if (Physics.circRectCollision(this, Objects.pad)) {
        this.speedY = -this.speedY;
    }
    //console.log(this.speedY);
}
