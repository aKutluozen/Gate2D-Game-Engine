function Point(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments);
    this.img = Gate2D.Loader.getFile('imgPoint');
    this.coll = new Gate2D.Physics.CircleCollision(x, y, z, width, height);
    this.controlled = true;

    this.whatIsAroundMe = [];
}

Point.prototype = new Gate2D.Entity();

Point.prototype.draw = function () {
    //this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Point.prototype.update = function () {
    this.x = this.movement.x;
    this.y = this.movement.y;
    this.coll.update(this.x + this.width / 2, this.y + this.height / 2); // Always update the collision area position
}

Point.prototype.handleMouseMovement = function (input) {
    this.movement = input;
}