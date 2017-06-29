function Pad(x, y, width, height, tag, controlled) {
    Entity.apply(this, arguments);
}

Pad.prototype = new Entity();

Pad.prototype.draw = function(ctx){
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

Pad.prototype.update = function() {
    this.x = this.movement.x;
}