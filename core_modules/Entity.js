/**
 * @Entity.js 
 * @author Ali Kutluozen
 *
 * Provides main game entities to be inherited from.
 */

function Entity(x, y, width, height, tag, controlled, static) {
    this.x = x || 0;
    this.y = y || 0;
    this.movement = {};
    this.width = width || 0;
    this.height = height || 0;
    this.tag = tag || '';
    this.controlled = controlled || false;
    this.static = false;
    this.color = 'rgba(255, 128, 128, 0.25)';
    this.movement = {x: 0, y: 0};
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
        this.movement = input;
    },
    
    handleMouseDown: function (input) {
        // console.log(input);  
    },
    
    update: function() {
        this.x = this.movement.x;
        this.y = this.movement.y;
    }
}
