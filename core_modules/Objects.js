/**
 * Objects.js 
 * 
 * @summary         Provides an interface to pool and keep track of game objects
 * @module          Objects
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Objects = (function () {

    'use strict';

    // Private local variables

    let objects = [];

    // Main objects module to be exported

    return {
        /**
         * Returns the amount of game objects
         * 
         * @returns {number}
         */
        length: function () {
            return objects.length;
        },

        /**
         * Returns the game objects array
         * 
         * @returns {array}
         */
        objects: function () {
            return objects;
        },

        /**
         * Adds an array of game objects
         * 
         * @param {array}   entities - An array of game objects
         */
        add: function (entities) {
            for (let i = 0; i < entities.length; i++) {
                objects.push(entities[i]);

                // Also make them available to outside world through Objects
                this[entities[i].name] = entities[i];
            }
        },

        /**
         * Finds and returns a game object by a given property and value
         * 
         * @param {string}  property - Property of the game object
         * @param {string}  value - Value of the property
         * @returns {object}  
         */
        findByProperty: function (property, value) {
            for (let i = 0; i < objects.length; i++) {
                if (objects[i][property] == value) {
                    return objects[i];
                }
            }
            return null;
        }
    }
}());
