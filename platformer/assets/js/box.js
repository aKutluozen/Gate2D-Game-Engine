function Box(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments);
    this.img = Gate2D.Loader.getFile('imgBricks'); // Load the object image
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
    this.randomColor = 0//Math.floor(Math.random()*7) * 16;
}

Box.prototype = new Gate2D.Entity();

Box.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.randomColor, 0, 16, 16, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Box.prototype.update = function () {
    this.coll.update(this.x, this.y);
}