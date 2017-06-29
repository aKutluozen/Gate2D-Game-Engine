/**
 * @GameObjects.js 
 * @author Ali Kutluozen
 *
 * Provides an interface to add and keep track of game objects
 */

var GameObjects = (function () {

    'use strict';

    // Private local variables

    let objects = [];

    // Main objects module to be exported

    return {
        // Basic accessors for video elements
        length: function () {
            return objects.length;
        },

        objects: function () {
            return objects;
        },
        
        /**
         * Adds an array of game objects
         * @param {array} entities - An array of game objects
         */
        add: function (entities) {
            for (var i = 0; i < entities.length; i++) {
                objects.push(entities[i]);
                
                // Also make them available to outside world through GameObjects
                this[entities[i].tag] = entities[i];
            }
        },

        /**
         * Finds and returns a game object by tag
         * @param {string} tag - Name of the game object
         */
        find: function (tag) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].tag == tag) {
                    return objects[i];
                }
            }
            return null;
        }
    }
}());
