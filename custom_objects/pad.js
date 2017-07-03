function Pad(x, y, width, height, tag, controlled) {
    Entity.apply(this, arguments);
}

Pad.prototype = objPad = new Entity();

objPad.draw = function(ctx){
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

objPad.update = function() {
    this.x = this.movement.x;
}