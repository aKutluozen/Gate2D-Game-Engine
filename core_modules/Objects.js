/**
 * Objects.js 
 * 
 * @summary         Provides an interface to add and keep track of game objects
 * @module          Objects
 * @author          Ali Kutluozen
 * @version         7/5/2017
 */

var Objects = (function () {

    'use strict';

    // Private local variables

    let objects = [];

    // Main objects module to be exported

    return {
        /**
         * @description     Returns the amount of game objects
         * @returns {number}
         */
        length: function () {
            return objects.length;
        },

        /**
         * @description     Returns the game objects array
         * @returns {array}
         */
        objects: function () {
            return objects;
        },

        /**
         * @description     Adds an array of game objects
         * @param {array}   entities - An array of game objects
         */
        add: function (entities) {
            for (let i = 0; i < entities.length; i++) {
                objects.push(entities[i]);

                // Also make them available to outside world through Objects
                this[entities[i].tag] = entities[i];
            }
        },

        /**
         * @description     Finds and returns a game object by tag
         * @param {string}  tag - Name of the game object
         */
        find: function (tag) {
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].tag == tag) {
                    return objects[i];
                }
            }
            return null;
        }
    }
}());
