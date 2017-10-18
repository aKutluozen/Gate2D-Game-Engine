function Box(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments);
    this.img = Gate2D.Loader.getFile('sprites');
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
    this.randomColor = Math.floor(Math.random() * 7) * 64;
    this.breaking = false;
}

Box.prototype = new Gate2D.Entity();

Box.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.randomColor, 0, 64, 32, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Box.prototype.update = function () {
    this.coll.update(this.x, this.y);
}