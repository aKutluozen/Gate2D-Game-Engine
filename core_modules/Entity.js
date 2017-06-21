/**
 * @Entity.js 
 * @author Ali Kutluozen
 *
 * Provides main game entities to be inherited from.
 */

function Entity(x, y, width, height, tag, controlled, static) {    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tag = tag;
    this.controlled = controlled;
    this.collided = false;
    this.static = false;
    this.color = "rgb(" + r(0, 255) + "," + r(0, 255) + "," + r(0, 255) + ")";
}

function r(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

Entity.prototype = {
    draw: function (context, color) {
        context.beginPath();
        context.arc(this.x, this.y, 25, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#000000';
        context.stroke();
    },

    handleControls: function (input) {
        this.x = Math.floor(input.x);
        this.y = Math.floor(input.y);
    },

    anim: function (deltaTime) {
        this.x += Math.floor(Math.random() * 0.5 * deltaTime);
        this.y += Math.floor(Math.random() * 0.5 * deltaTime);
        if (this.x > Video.canvas().width) this.x = 0;
        if (this.y > Video.canvas().height) this.y = 0;
    }
}
