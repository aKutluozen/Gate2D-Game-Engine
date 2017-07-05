function Room(name, width, height, background) {
    this.x = 0;
    this.y = 0;
    this.name = name;
    this.width = width;
    this.height = height;
    this.background = Loader.getFile(background);
}

Room.prototype = {
    draw: function(ctx) {
        ctx.drawImage(this.background, this.x, this.y, this.width, this.height);
    },
    
    update: function(){
        
    }
}