function Scene(name, width, height, background, objectsList) {
    this.x = 0;
    this.y = 0;
    this.name = name;
    this.width = width;
    this.height = height;
    this.background = Loader.getFile(background);
    this.objects = objectsList;
}

Scene.prototype = {
    draw: function(ctx) {
        ctx.drawImage(this.background, this.x, this.y, this.width, this.height);
    },
    
    update: function(){
        
    }
}