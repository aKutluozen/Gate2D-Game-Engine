function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speed = 2;

    // Define collision area if one is needed
    this.coll = new Physics.CircleCollision(x, y, width);
}

// Establish the inheritance
Ball.prototype = new Entity();

// Define object methods
Ball.prototype.draw = function () {
    let ctx = Video.bufferContext();
    this.coll.draw(ctx);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
    
    for (let i = 0; i < Levels.currentLevel().objectsList.length; i++) {
        if (Levels.currentLevel().objectsList[i].tag != 'wall')
        if (this.coll.checkCollision(this, Levels.currentLevel().objectsList[i])) {
            this.collided = true;
        } else {
            this.collided = false;
        }
    }

}
