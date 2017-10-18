/**
 * Math.js
 * 
 * @summary         Provides a basic math functions
 * @module          GameMath
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Math = (function () {

    'use strict';

    return {
        /**
         * Returns the distance between 2 points
         * 
         * @param {number}  a - Length of side a
         * @param {number}  b - Length of side b
         * @returns {number}
         */
        hypotenuse: function (a, b) {
            return Math.sqrt(a * a + b * b);
        },

        /**
         * Returns a number that is limited between 2 numbers
         * 
         * @param {number}  num - Number to be clamped
         * @param {number}  min - Minimum value allowed
         * @param {number}  max - Maximum value allowed
         * @returns {number}
         */
        clamp: function (num, min, max) {
            return Math.min(Math.max(min, num), max);
        },

        /**
         * Returns x and y velocities based on an angle and speed
         * 
         * @param {number}  angle - Angle in degrees (0 to 360)
         * @param {number}  speed - Speed multiplier
         * @returns {number}
         */
        direction: function (angle, speed) {
            return {
                x: Math.cos(angle * Math.PI / 180) * speed,
                y: Math.sin(angle * Math.PI / 180) * speed
            }
        }
    }
}());
