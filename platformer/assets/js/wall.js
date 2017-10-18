
function Wall(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments);
    this.img = Gate2D.Loader.getFile('imgBricks');
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

Wall.prototype = new Gate2D.Entity();

Wall.prototype.draw = function () {    
    this.ctx.drawImage(this.img, 112, 0, 16, 16, this.x, this.y, this.width, this.height);
    this.coll.draw();
}