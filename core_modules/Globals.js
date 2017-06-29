/**
 * @Globals.js 
 * @author Ali Kutluozen
 *
 * Provides an interface to add and keep track of game variables
 */

var Globals = (function () {

    'use strict';

    // Private local variables

    let globals = [];

    // Main globals module to be exported

    return {
        // Basic accessors for global variable elements
        length: function () {
            return globals.length;
        },

        globals: function () {
            return globals;
        },
        
        /**
         * Adds an array of game objects
         * @param {array} values - An array of game variables
         */
        add: function (values) {
            for (var i = 0; i < values.length; i++) {
                globals.push(values[i]);
                
                // Also make them available to outside world through Globals
                this[Object.keys(values[i])[0]] = Object.values(values[i])[0];
            }
        }
    }
}());
