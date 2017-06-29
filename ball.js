function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments);
}

Ball.prototype = {
    draw: function(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    },
    
    update: function() {
        this.x += 2;
        this.y += 2;
        
        if (Physics.boxCollision(this, GameObjects.pad)) {
            this.y = GameObjects.pad.y-20;
            this.x += 0;
        }
    }
}

