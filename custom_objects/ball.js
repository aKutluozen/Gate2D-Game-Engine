function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments);
    this.img = Loader.getFile('img_ball');
    this.xSpeed = 2;
    this.ySpeed = 2;
}

Ball.prototype = new Entity();

Ball.prototype = {
    draw: function(context) {
        context.drawImage(this.img, this.x, this.y);
    },
    
    update: function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if (Physics.boxCollision(this, Objects.pad)) {
            this.ySpeed *= -1;
        }
    }
}

