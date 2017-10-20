/**
 * Entity.js 
 * 
 * Provides main game entities to be inherited from.
 * 
 * @constructor
 * @param {number}  x - X position of the entity
 * @param {number}  y - Y position of the entity
 * @param {number}  z - Z/depth position of the entity
 * @param {number}  width - Width of the entity
 * @param {number}  height - Height of the entity
 * @param {string}  name - Name of the entity
 * @param {string}  tag - Tag of the entity
 * @param {boolean} controlled - Decides if the entity is controlled or not
 * @param {boolean} isStatic - Decides if the entity is static or not
 * 
 * @author          Ali Kutluozen
 */
Gate2D.Entity = function (x, y, z, width, height, name, tag, controlled, isStatic) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.speed = 0;
    this.rotation = 0;
    this.width = width || 0;
    this.height = height || 0;
    this.name = name || '';
    this.tag = tag || '';
    this.controlled = controlled || false;
    this.isStatic = isStatic || false;
    this.color = 'rgba(255, 128, 128, 0.25)';
    this.movement = {
        x: 0,
        y: 0,
        Z: 0
    };
    this.collided = false;
    this.ctx = null;
    this.id = this.x + '-' + this.y + '-' + this.z;
}

/**
 * Skeleton methods for an entity (Sort of like an interface pattern)
 */
Gate2D.Entity.prototype = {

    /**
     * Draw the entity box on the context
     * 
     * @param {object}  ctx - Context to draw on
     * @param {string}  color   - Color of the entity box
     */
    draw: function (color) {
        if (Video.debug()) {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },

    /**
     * Passes the key down event as a parameter
     * 
     * @param {object}  input - Event
     */
    handleKeyDown: function (input) {

    },

    /**
     * Passes the key up event as a parameter
     * 
     * @param {object}  input - Event
     */
    handleKeyUp: function (input) {

    },

    /**
     * Passes the mouse movement event as a parameter
     * 
     * @param {object}  input - Event
     */
    handleMouseMovement: function (input) {

    },

    /**
     * Passes the mouse movement event as a parameter
     * 
     * @param {object}  input - Event
     */
    handleMouseDown: function (input) {

    },

    /**
     * Passes the mouse movement event as a parameter
     * 
     * @param {object}  input - Event
     */
    handleMouseUp: function (input) {

    },

    /**
     * Update function of an entity
     */
    update: function () {

    },

    /**
     * Assigns buffer context to entity context
     */
    setupDisplay: function () {
        this.ctx = Gate2D.Video.bufferContext();
    }
}