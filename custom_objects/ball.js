function Ball(x, y, z, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image
    
    // Define object specific properties
    this.speedX = -2;
    this.speedY = -2;
    this.controlled = true;
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

    if (Objects.findInPosition(this.x, this.y) != null) {
        let objFound = Objects.findInPosition(this.x, this.y);
        if (objFound.name === 'wall' && Physics.circRectCollision(this, objFound)) {
            if (objFound.x < this.x) {
                this.speedX *= -1;
            }
            else if (objFound.y < this.y) {
                this.speedY *= -1;
            }
        }
    }
    
}
