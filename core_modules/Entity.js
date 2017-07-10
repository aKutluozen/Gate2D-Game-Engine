/**
 * Entity.js 
 * 
 * @description     Provides main game entities to be inherited from.
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  width - Width of the entity
 * @param {number}  height - Height of the entity
 * @param {string}  name - Name of the entity
 * @param {string}  tag - Tag of the entity
 * @param {boolean} controlled - Decides if the entity is controlled or not
 * @param {boolean} isStatic - Decides if the entity is static or not
 * 
 * @author          Ali Kutluozen
 */
function Entity(x, y, width, height, name, tag, controlled, isStatic) {
    this.x = x || 0;
    this.y = y || 0;
    this.speed = 0;
    this.rotation = 0;
    this.movement = {};
    this.width = width || 0;
    this.height = height || 0;
    this.name = name || '';
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

/**
 * @description     Skeleton methods for an entity (Sort of like an interface pattern)
 */
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

    /**
     * @description     Passes the key down event as a parameter
     * @param {object}  input - Event
     */
    handleKeyDown: function (input) {

    },

    /**
     * @description     Passes the key up event as a parameter
     * @param {object}  input - Event
     */
    handleKeyUp: function (input) {

    },

    /**
     * @description     Passes the mouse movement event as a parameter
     * @param {object}  input - Event
     */
    handleMouseMovement: function (input) {

    },

    /**
     * @description     Passes the mouse movement event as a parameter
     * @param {object}  input - Event
     */
    handleMouseDown: function (input) {

    },

    update: function () {

    }
}
