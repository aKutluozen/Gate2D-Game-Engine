function Point(x, y, z, width, height) {
    Entity.apply(this, arguments);
    this.img = Loader.getFile('imgPoint');
    this.coll = new Physics.CircleCollision(x, y, z, width);
}

Point.prototype = new Entity();

Point.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Point.prototype.update = function () {
    this.x = this.movement.x - this.width/2;
    this.y = this.movement.y - this.height/2;
    this.coll.update(this.x + this.width/2, this.y + this.height/2);
}

Point.prototype.handleMouseDown = function (input) {
    this.movement = input;
}