
function Wall(x, y, z, width, height) {
    Entity.apply(this, arguments);
    this.img = Loader.getFile('imgBricks');
    this.coll = new Physics.AABBCollision(x, y, z, width, height);
}

Wall.prototype = new Entity();

Wall.prototype.draw = function () {    
    this.ctx.drawImage(this.img, 112, 0, 16, 16, this.x, this.y, this.width, this.height);
    this.coll.draw();
}