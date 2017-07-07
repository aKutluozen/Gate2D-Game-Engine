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
         * @description     Creates an axis-aligned bounding box area with the necessary methods
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
                if (thisEntity.coll.x < otherEntity.coll.x + otherEntity.coll.width &&
                    thisEntity.coll.x + thisEntity.coll.width > otherEntity.coll.x &&
                    thisEntity.coll.y < otherEntity.coll.y + otherEntity.coll.height &&
                    thisEntity.coll.y + thisEntity.coll.height > otherEntity.coll.y)
                    return true;
                else return false;
            };
        },

        /**
         * @description     Creates a 2D circle collision area with the necessary methods
         * @param {number}  x - X position
         * @param {number}  y - Y position
         * @param {number}  r - Radius of the collision area
         */
        CircleCollision: function (x, y, r) {
            // Constructor
            this.x = x || 0;
            this.y = y || 0;
            this.r = r/2 || 0;

            // Methods

            /**
             * @description     Draws the collision are on debug mode
             * @param {object}  ctx - Context to draw on
             */
            this.draw = function (ctx) {
                if (debug) {
                    ctx.fillStyle = "rgba(244, 188, 66, 0.5)";
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.fill();
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
                if (thisEntity.coll.r != undefined && otherEntity.coll.r != undefined) {
                    if (GameMath.hypotenuse(thisEntity.coll.x - otherEntity.coll.x, thisEntity.coll.y - otherEntity.coll.y) <=
                        (thisEntity.coll.r + otherEntity.coll.r))
                        return true;
                    else return false;
                } else {
                    console.error('Both objects must have a radius!');
                }
            };
        },

        /**
         * @description     Moves a given object to a point
         * @param {object}  from - The object that needs to move
         * @param {object}  to - The target point
         */
        moveTowards: function (from, to) {
            from.rotation = Math.atan2(from.y + from.height/2 - to.y - to.height/2, from.x + from.width/2 - to.x - to.width/2);
            from.x -= Math.cos(from.rotation) * from.speed;
            from.y -= Math.sin(from.rotation) * from.speed;
        }
    }
}());
