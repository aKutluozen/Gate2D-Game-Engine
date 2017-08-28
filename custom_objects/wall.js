
function Wall(x, y, z, width, height) {
    Entity.apply(this, arguments);
    //this.img = Loader.getFile('imgBlock'); // Load the object image
    this.coll = new Physics.AABBCollision(x, y, z, width, height);
}

Wall.prototype = new Entity();

Wall.prototype.draw = function () {    
    //this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //this.ctx.fillStyle = "darkred";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.coll.draw();
}