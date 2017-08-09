function Pad (x, y, width, height, tag) {
    Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Loader.getFile('imgPad'); // Load the object image
    this.coll = new Physics.AABBCollision(x, y, width, height);
    this.controlled = true;
}

// Establish the inheritance
Pad.prototype = new Entity();

// Define object methods
Pad.prototype.draw = function () {
    this.coll.draw();
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Pad.prototype.update = function () {
    this.coll.update(this.x, this.y); // Always update the collision area position
}

Pad.prototype.handleMouseMovement = function (input) {
    this.x = input.x;
}