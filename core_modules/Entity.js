/**
 * Entity.js 
 * 
 * @description     Provides main game entities to be inherited from.
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  width - Width of the entity
 * @param {number}  height - Height of the entity
 * @param {string}  tag - Name of the entity
 * @param {boolean} controlled - Decides if the entity is controlled or not
 * @param {boolean} isStatic - Decides if the entity is static or not
 * 
 * @author          Ali Kutluozen
 */
function Entity(x, y, width, height, tag, controlled, isStatic) {
    this.x = x || 0;
    this.y = y || 0;
    this.speed = 0;
    this.rotation = 0;
    this.movement = {};
    this.width = width || 0;
    this.height = height || 0;
    this.tag = tag || '';
    this.controlled = controlled || false;
    this.isStatic = isStatic || false;
    this.color = 'rgba(255, 128, 128, 0.25)';
    this.movement = {
        x: 0,
        y: 0
    };
    this.collided = false;
}

// A skeleton of methods available
Entity.prototype = {

    /**
     * @description     Draw the entity box on the context
     * @param {object}  context - Context to draw on
     * @param {string}  color   - Color of the entity box
     */
    draw: function (context, color) {
        if (Video.debug()) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    },

    handleKeyDown: function (input) {

    },

    handleKeyUp: function (input) {

    },

    handleMouseMovement: function (input) {

    },

    handleMouseDown: function (input) {
        this.movement = input;
    },

    update: function () {

    }
}
