/**
 * Globals.js
 * 
 * @summary         Provides an interface to add and keep track of game variables
 * @module          Globals
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Globals = (function () {

    'use strict';

    // Private local variables

    let _globals = [];

    // Main globals module to be exported

    return {
        /**
         * Returns the length of the globals array
         * 
         * @returns {number}
         */
        length: function () {
            return _globals.length;
        },

        /**
         * Returns the globals array
         * 
         * @returns {array}
         */
        globals: function () {
            return _globals;
        },

        /**
         * Adds an array of game objects
         * 
         * @param {array}   values - An array of game variables (Each global is key value pair - {key: value})
         */
        add: function (values) {
            let i = values.length;

            for (;i--;) {
                _globals.push(values[i]);

                // Also make them available to outside world through Globals
                this[Object.keys(values[i])[0]] = Object.values(values[i])[0];
            }
            
            console.log('Global variables added:', i);
        }
    }
}());