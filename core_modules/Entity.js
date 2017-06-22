/**
 * @Entity.js 
 * @author Ali Kutluozen
 *
 * Provides main game entities to be inherited from.
 */

function Entity(x, y, width, height, tag, controlled, static) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.tag = tag || '';
    this.controlled = controlled || false;
    this.static = false;
    this.color = 'rgba(255, 128, 128, 0.25)';
    this.image = Loader.getFile('charImg');
}

Entity.prototype = {
    draw: function (context, color) {
        if (Video.debug()) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    },

    handleKeyDown: function (input) {
        // console.log(input, " down");
    },
    
    handleKeyUp: function (input) {
        // console.log(input, " up");
    },
    
    handleMouseMovement: function (input) {
        // console.log(input);  
    },
    
    handleMouseDown: function (input) {
        // console.log(input);  
    },

    anim: function (deltaTime) {
        this.x += Math.floor(Math.random() * 0.2 * deltaTime);
        this.y += Math.floor(Math.random() * 0.2 * deltaTime);
        if (this.x > Video.canvas().width) this.x = 0;
        if (this.y > Video.canvas().height) this.y = 0;
    }
}
