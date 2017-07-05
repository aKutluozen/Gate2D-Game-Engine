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
         * @returns {number}
         */
        pythagorean: function (sideA, sideB) {
            return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
        }
    }
}());
