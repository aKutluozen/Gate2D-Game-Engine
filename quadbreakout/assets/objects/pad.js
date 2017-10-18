function Pad (x, y, z, width, height) {
    Gate2D.Entity.apply(this, arguments); // Apply the inherited properties
    this.img = Gate2D.Loader.getFile('sprites'); // Load the object image
    this.coll = new Gate2D.Physics.AABBCollision(x, y, z, width, height);
    this.controlled = true;
}

// Establish the inheritance
Pad.prototype = new Gate2D.Entity();

// Define object methods
Pad.prototype.draw = function () {
    this.ctx.drawImage(this.img, 0, 32, 128, 16, this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Pad.prototype.update = function () {
    this.x = this.movement.x - this.width / 2;
    if (this.x <= 32) {
        this.x = 32;
    } else if (this.x + this.width >= 608) {
        this.x = 608 - this.width;
    }
    this.coll.update(this.x, this.y); // Always update the collision area position
}

Pad.prototype.handleMouseMovement = function (input) {
    this.movement = input;
}
