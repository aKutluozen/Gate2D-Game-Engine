function Point(x, y, width, height, tag) {
    Entity.apply(this, arguments);
    this.img = Loader.getFile('imgPoint');
}

Point.prototype = new Entity();

Point.prototype.draw = function (context) {
    context.drawImage(this.img, this.x - this.width/2, this.y - this.height/2);
}

Point.prototype.update = function () {
    this.x = this.movement.x - this.width/2;
    this.y = this.movement.y - this.height/2;
}