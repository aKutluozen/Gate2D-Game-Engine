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

    let objectsArray = [],  // Array of game objects for internal use
        objects = {}        // Game objects that will be presented to outside world

    // Main objects module to be exported

    return {
        /**
         * Returns the amount of game objects
         * 
         * @returns {number}
         */
        length: function () {
            return objectsArray.length;
        },

        /**
         * Returns the game objects array or assigns new objects
         * 
         * @param {array}   objs - An array of game objects
         * @returns {array}
         */
        objects: function (objs) {
            return objs === undefined ? objectsArray : objectsArray = objs.slice();
        },

        /**
         * Adds an array of game objects
         * 
         * @param {array}   entities - An array of game objects or a single object
         */
        add: function (entities) {
            if (entities.constructor === Array) {
                for (let i = 0; i < entities.length; i++) {
                    objectsArray.push(entities[i]);
                    objects[entities[i].name] = entities[i];
                }
            } else {
                objectsArray.push(entities);
                objects[entities.name] = entities;
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
            for (let i = 0; i < objectsArray.length; i++) {
                if (objectsArray[i][property] == value) {
                    return objectsArray[i];
                }
            }
            return null;
        },

        /**
         * Returns the game objects with a given name
         * This function is a shortcut for findByProperty('name', <name>)
         * 
         * @param {string}   name - An array of game objects
         * @returns {object}
         */
        get: function (name) {
            return objects[name];
        }
    }
}());