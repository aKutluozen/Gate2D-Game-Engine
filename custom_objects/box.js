function Box(x, y, z, width, height) {
    Entity.apply(this, arguments);
    this.img = Loader.getFile('imgBlock'); // Load the object image
    this.coll = new Physics.AABBCollision(x, y, z, width, height);
}

Box.prototype = new Entity();

Box.prototype.draw = function () {    
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Box.prototype.update = function () {
    this.coll.update(this.x, this.y);
    
    // if (Physics.circRectCollision(Objects.ball, this) === true) {
    //     this.x = -100;   
    // }
}