function Box(x, y, width, height, radius, tag, controlled, isStatic) {
    Entity.apply(this, arguments);

    this.coll = new Physics.CircleCollision(x, y, width);
}

Box.prototype = new Entity();

Box.prototype.draw = function (ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
