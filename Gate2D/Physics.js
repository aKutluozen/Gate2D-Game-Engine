/**
 * Physics.js 
 * 
 * @summary         Provides basic physics functions
 * @module          Physics
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Physics = (function () {

    'use strict';

    // Private local variables

    let _debug = false; // Toggles physics debug mode

    // Main physics module to be exported

    return {
        /**
         * Toggles debug mode, returns the value if needed
         * 
         * @returns {boolean}
         */
        debug: function (bool) {
            if (bool == undefined)
                return _debug;
            _debug = bool;
        },

        /**
         * Creates an axis-aligned bounding box area with the necessary methods
         * 
         * @constructor
         * @param {number}  x - X position
         * @param {number}  y - Y position
         * @param {number}  z - Z position/depth
         * @param {number}  width - Width of the collision area
         * @param {number}  height - Height of the collision area
         */
        AABBCollision: function (x, y, z, width, height) {
            // Constructor
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.width = width || 0;
            this.height = height || 0;

            // Methods

            /**
             * Draws the collision are on debug mode
             * 
             * @param {object}  ctx - Context to draw on
             */
            this.draw = function () {
                if (_debug) {
                    let buffer = Gate2D.Video.bufferContext();
                    buffer.fillStyle = "rgba(244, 188, 66, 0.35)";
                    buffer.fillRect(this.x, this.y, this.width, this.height);
                }
            };

            /**
             * Updates the location of collision area
             * 
             * @param {number}  x - X position
             * @param {number}  y - Y position
             */
            this.update = function (x, y) {
                this.x = x;
                this.y = y;
            };
        },

        /**
         * Creates a 2D circle collision area with the necessary methods
         * 
         * @constructor
         * @param {number}  x - X position
         * @param {number}  y - Y position
         * @param {number}  z - Z position/depth
         * @param {number}  r - Radius of the collision area
         */
        CircleCollision: function (x, y, z, r) {
            // Constructor
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.r = r / 2 || 0;
            this.width = r / 2 || 0;
            this.height = r / 2 || 0;

            // Methods

            /**
             * Draws the collision are on debug mode
             * 
             * @param {object}  ctx - Context to draw on
             */
            this.draw = function () {
                if (_debug) {
                    let buffer = Gate2D.Video.bufferContext();
                    buffer.fillStyle = "rgba(244, 188, 66, 0.75)";
                    buffer.beginPath();
                    buffer.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    buffer.fill();
                }
            };

            /**
             * Updates the location of collision area
             * 
             * @param {number}  x - X position
             * @param {number}  y - Y position
             */
            this.update = function (x, y) {
                this.x = x;
                this.y = y;
            };
        },

        /**
         * Checks collision between 2 circular entities
         * This function is internally used. However, you may call it as you need it.
         * 
         * @param {object}  thisEntity  - The object that will collide with the other object
         * @param {object}  otherEntity - The object that will collide with the other object
         * @returns {boolean}
         */
        checkCircleCollision: function (thisEntity, otherEntity) {
            if (thisEntity.coll.z === otherEntity.coll.z) {
                if (thisEntity.coll.r != undefined && otherEntity.coll.r != undefined) {
                    if (Gate2D.Math.hypotenuse(thisEntity.coll.x - otherEntity.coll.x, thisEntity.coll.y - otherEntity.coll.y) <=
                        (thisEntity.coll.r + otherEntity.coll.r))
                        return true;
                    else return false;
                } else {
                    console.error('Both objects must have a radius!');
                }
            } else {
                return;
            }
        },

        /**
         * Checks collision between 2 rectangular entities  
         * This function is internally used. However, you may call it as you need it.
         * 
         * @param {object}  thisEntity  - The object that will collide with the other object
         * @param {object}  otherEntity - The object that will collide with the other object
         * @returns {boolean}
         */
        checkAABBCollision: function (thisEntity, otherEntity) {
            if (thisEntity.coll.z === otherEntity.coll.z) {
                if (thisEntity.coll.x < otherEntity.coll.x + otherEntity.coll.width &&
                    thisEntity.coll.x + thisEntity.coll.width > otherEntity.coll.x &&
                    thisEntity.coll.y < otherEntity.coll.y + otherEntity.coll.height &&
                    thisEntity.coll.y + thisEntity.coll.height > otherEntity.coll.y)
                    return true;
                else return false;
            } else {
                return;
            }
        },

        /**
         * Checks collision between a circle and a rectangle
         * This function is internally used. However, you may call it as you need it.
         * 
         * @param {object}  circle - Any object that has a circleCollision property as collision area
         * @param {object}  rect -  Any object that has a AABBCollision property as collision area - MIGHT CHANGE TO A STRING
         * @returns {boolean}
         */
        checkCircleRectangleCollision: function (circle, rect) {
            let circleDistX = Math.abs(circle.coll.x - (rect.coll.x + rect.coll.width / 2)),
                circleDistY = Math.abs(circle.coll.y - (rect.coll.y + rect.coll.height / 2));

            if (circle.coll.z === rect.coll.z) {
                // Handle collision from left
                if (circleDistX > (rect.coll.width / 2 + circle.coll.r)) {
                    return false;
                }

                // From top
                if (circleDistY > (rect.coll.height / 2 + circle.coll.r)) {
                    return false;
                }

                // From right
                if (circleDistX <= (rect.coll.width / 2)) {
                    return true;
                }

                // From bottom
                if (circleDistY <= (rect.coll.height / 2)) {
                    return true;
                }

                // From corners
                return (
                    Math.pow(circleDistX - rect.coll.width / 2, 2) +
                    Math.pow(circleDistY - rect.coll.height / 2, 2) <=
                    (Math.pow(circle.coll.r, 2))
                );
            } else {
                return;
            }
        },

        /**
         * Finds and returns a game object based on collision
         * This function takes shape based on the shape of the given object (circle, rectangle)
         * 
         * @param {object}  obj - The object that the search is based around
         * @returns {array}
         */
        checkCollision: function (obj) {
            // Create the temporary array and cache number
            let arr = [],
                objects = Gate2D.Objects.objects(),
                len = Gate2D.Objects.length();

            // Searching object is a circular one
            if (obj.coll.r !== undefined) {
                
                for (let i = 0; i < len; i++) {

                    // Circle to circle collision
                    if (objects[i].coll.r !== undefined) {
                        if (this.checkCircleCollision(obj, objects[i]) && objects[i] != obj) {
                            arr.push(objects[i]);
                        }
                    }

                    // Circle to rectangle collision
                    else {
                        if (this.checkCircleRectangleCollision(obj, objects[i]) && objects[i] != obj) {
                            arr.push(objects[i]);
                        }
                    }
                }
            }

            // Searching object is a rectangular one
            else {
                for (let i = 0; i < len; i++) {

                    // Rectangle to circle collision
                    if (objects[i].coll.r !== undefined) {
                        if (this.checkCircleRectangleCollision(objects[i], obj) && objects[i] != obj) {
                            arr.push(objects[i]);
                        }
                    }

                    // Rectangle to rectangle collision
                    else {
                        if (this.checkAABBCollision(obj, objects[i]) && objects[i] != obj) {
                            arr.push(objects[i]);
                        }
                    }
                }
            }
            return arr;
        },

        /**
         * Moves a given object to a point, returns the rotation if needed
         * 
         * @param {object}  from - The object that needs to move
         * @param {object}  to - The target point
         * @param {object}  speed - Speed of the movement
         * @returns {number}
         */
        moveTowards: function (from, to, speed) {
            from.rotation = Math.atan2(from.y + from.height / 2 - to.y - to.height / 2, from.x + from.width / 2 - to.x - to.width / 2);
            from.x -= Math.cos(from.rotation) * speed;
            from.y -= Math.sin(from.rotation) * speed;
            return from.rotation;
        },
    }
}());