/**
 * Math.js
 * 
 * @summary         Provides a basic math functions
 * @module          GameMath
 * @author          Ali Kutluozen
 * @version         7/5/2017
 */

var GameMath = (function () {

    'use strict';

    return {
        /**
         * @description     Returns the distance between 2 points
         * @param {number}  a - Length of side a
         * @param {number}  b - Length of side b
         * @returns {number}
         */
        hypotenuse: function (a, b) {
            return Math.sqrt(a * a + b * b);
        }
    }
}());
