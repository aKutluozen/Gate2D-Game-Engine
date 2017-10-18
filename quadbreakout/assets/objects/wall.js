
function Wall(x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments);
    this.img = Gate2D.Loader.getFile('sprites');
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
}

Wall.prototype = new Gate2D.Entity();

Wall.prototype.draw = function () {    
    this.ctx.drawImage(this.img, 480, 32, 32, 32, this.x, this.y, this.width, this.height);
    this.coll.draw();
}