function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgBall'); // Load the object image

    // Define object specific properties
    this.speed = 2;

    // Define collision area if one is needed
    this.coll = new Physics.AABBCollision(x, y, width, height);
}

// Establish the inheritance
Ball.prototype = new Entity();

// Define object methods
Ball.prototype.draw = function (ctx) {
    this.coll.draw(ctx);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Ball.prototype.update = function () {
    this.coll.update(this.x, this.y); // Always update the collision area position

    var dist = GameMath.hypotenuse(this.x - Objects.point.x, this.y - Objects.point.y);

    if (dist > 40)
        Physics.moveTowards(this, Objects.point);

    if (this.coll.checkCollision(this, Objects.box.coll)) {
        this.collided = true;
    } else {
        this.collided = false;
    }
}
