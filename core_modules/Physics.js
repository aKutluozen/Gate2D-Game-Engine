/**
 * Physics.js 
 * 
 * @summary         Provides basic physics functions
 * @module          Physics
 * @author          Ali Kutluozen
 * @version         7/5/2017
 */

var Physics = (function () {

    'use strict';

    // Private local variables

    let debug = false; // Toggles physics debug mode

    // Main physics module to be exported

    return {

        debug: function (bool) {
            debug = bool;
        },

        /**
         * @description     Creates an axis-aligned bounding box object with the necessary methods
         * @param {number}  x - X position
         * @param {number}  y - Y position
         * @param {number}  width - Width of the collision area
         * @param {number}  height - Height of the collision area
         */
        AABBCollision: function (x, y, width, height) {
            // Constructor
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;

            // Methods

            /**
             * @description     Draws the collision are on debug mode
             * @param {object}  ctx - Context to draw on
             */
            this.draw = function (ctx) {
                if (debug) {
                    ctx.fillStyle = "rgba(244, 188, 66, 0.5)";
                    ctx.fillRect(this.x, this.y, this.height, this.width);
                }
            };

            /**
             * @description     Updates the location of collision area
             * @param {number}  x - X position
             * @param {number}  y - Y position
             */
            this.update = function (x, y) {
                this.x = x;
                this.y = y;
            };

            /**
             * @description     Checks collision between 2 entities    
             * @param {object}  thisEntity  - The object that will collide with the other object
             * @param {object}  otherEntity - The object that will collide with the other object
             */
            this.checkCollision = function (thisEntity, otherEntity) {
                if (thisEntity.x < otherEntity.x + otherEntity.width &&
                    thisEntity.x + thisEntity.width > otherEntity.x &&
                    thisEntity.y < otherEntity.y + otherEntity.height &&
                    thisEntity.y + thisEntity.height > otherEntity.y)
                    return true;
                else return false;
            };
        },

        /**
         * @description     Moves a given object to a point
         * @param {object}  from - The object that needs to move
         * @param {object}  to - The target point
         */
        moveTowards: function (from, to) {
            from.rotation = Math.atan2(from.y - to.y, from.x - to.x);
            from.x -= Math.cos(from.rotation) * from.speed;
            from.y -= Math.sin(from.rotation) * from.speed;
        }
    }
}());
