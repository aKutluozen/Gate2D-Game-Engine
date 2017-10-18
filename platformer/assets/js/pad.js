function Pad (x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('imgPad'); // Load the object image
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
    this.controlled = true;
}

// Establish the inheritance
Pad.prototype = new Gate2D.Entity();

// Define object methods
Pad.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //console.log(this.x);
    this.coll.draw();
}

Pad.prototype.update = function () {
    this.coll.update(this.x, this.y); // Always update the collision area position
}

Pad.prototype.handleMouseMovement = function (input) {

}