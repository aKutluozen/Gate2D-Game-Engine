function Box(x, y, width, height, tag, controlled) {
    Entity.apply(this, arguments);

    this.coll = new Physics.AABBCollision(x, y, width, height);
}

Box.prototype = new Entity();

Box.prototype.draw = function (ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
