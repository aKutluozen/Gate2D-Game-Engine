function Box(x, y, width, height) {
    Entity.apply(this, arguments);

    this.coll = new Physics.AABBCollision(x, y, width, height);
}

Box.prototype = new Entity();

Box.prototype.draw = function () {
    let ctx = Video.bufferContext();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Box.prototype.update = function () {
    this.coll.update(this.x, this.y);
}
