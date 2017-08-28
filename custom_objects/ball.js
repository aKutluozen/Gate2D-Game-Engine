function Ball(x, y, z, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speedX = 2;
    this.speedY = 2;
    console.log(Objects.get('pad'));
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
    
    // if (Physics.circRectCollision(this, ) {
    //     this.speedY = -2;
    //     let distPadCenter = Objects.pad.x + Objects.pad.width / 2;
    //     let distBallPadCenter = this.x + this.width / 2 - distPadCenter;
    //     this.speedX = distBallPadCenter * 0.15;
    // }

    // if (Physics.circRectCollision(this, Objects.wall)) {
    //     console.log("hit wall!");
    // }
}
