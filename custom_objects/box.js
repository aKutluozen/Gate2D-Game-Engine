function Box(x, y, width, height) {
    Entity.apply(this, arguments);
    this.color = 'rgb(' + ~~(Math.random() * 200 + 50) + ',' + ~~(Math.random() * 200 + 50) + ',' + ~~(Math.random() * 200 + 50) + ')';
    this.coll = new Physics.AABBCollision(x, y, width, height);
}

Box.prototype = new Entity();

Box.prototype.draw = function () {    
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.coll.draw();
}

Box.prototype.update = function () {
    this.coll.update(this.x, this.y);
    
    if (Physics.circRectCollision(Objects.ball, this)) {
        this.x = -100;        
    }
}