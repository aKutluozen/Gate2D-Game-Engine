/**
 * Globals.js
 * 
 * @summary         Provides an interface to add and keep track of game variables
 * @module          Globals
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Globals = (function () {

    'use strict';

    // Private local variables

    let globals = [];

    // Main globals module to be exported

    return {
        /**
         * Returns the length of the globals array
         * 
         * @returns {number}
         */
        length: function () {
            return globals.length;
        },
        
        /**
         * Returns the globals array
         * 
         * @returns {array}
         */
        globals: function () {
            return globals;
        },
        
        /**
         * Adds an array of game objects
         * 
         * @param {array}   values - An array of game variables
         */
        add: function (values) {
            for (let i = 0; i < values.length; i++) {
                globals.push(values[i]);
                
                // Also make them available to outside world through Globals
                this[Object.keys(values[i])[0]] = Object.values(values[i])[0];
            }
        }
    }
}());
