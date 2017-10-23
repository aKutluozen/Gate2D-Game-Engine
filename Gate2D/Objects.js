/**
 * Objects.js 
 * 
 * @summary         Provides an interface to pool and keep track of game objects
 * @module          Objects
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Objects = (function () {

    'use strict';

    // Private local variables

    let _objectsArray = [], // Array of game objects for internal use
        _objectsObject = {}, // Game objects that will be presented to outside world
        _objectsGroup = {}; // Objects group

    // Main objects module to be exported

    return {
        /**
         * Returns the amount of game objects
         * 
         * @returns {number}
         */
        length: function () {
            return _objectsArray.length;
        },

        /**
         * Returns the game objects array or assigns new objects
         * 
         * @param {array}   objs - An array of game objects
         * @returns {array}
         */
        objects: function (objs) {
            return objs === undefined ? _objectsArray : _objectsArray = objs.slice();
        },

        /**
         * Adds an array of game objects
         * 
         * @param {array}   entities - An array of game objects or a single object
         */
        add: function (entities) {
            if (entities.constructor === Array) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    _objectsArray.push(entities[i]);
                    _objectsObject[entities[i].name] = entities[i];
                }
            } else {
                _objectsArray.push(entities);
                _objectsObject[entities.name] = entities;
            }
        },

        /**
         * Creates a group of objects to be used in levels
         * 
         * @param {array}   name - Name of the group
         * @param {array}   entities - An array of game objects
         */
        createGroup: function (name, entities) {
            _objectsGroup[name] = entities;
        },

        /**
         * Gets a group of objects with a given name
         * 
         * @param {array}   name - Name of the group
         * @returns {array}
         */
        getGroup: function (name) {
            return _objectsGroup[name] || null;
        },

        /**
         * Finds and returns a game object by a given property and value
         * 
         * @param {string}  property - Property of the game object
         * @param {string}  value - Value of the property
         * @returns {object}  
         */
        findByProperty: function (property, value) {
            for (let i = 0, len = _objectsArray.length; i < len; i++) {
                if (_objectsArray[i][property] == value) {
                    return _objectsArray[i];
                }
            }
            return null;
        },

        /**
         * Returns the game objects with a given name
         * This function is a shortcut for findByProperty('name', <name>) with a faster lookup time
         * 
         * @param {string}   name - An array of game objects
         * @returns {object}
         */
        get: function (name) {
            return _objectsObject[name] || null;
        },

        /**
         * Hooks up all the game objects with the buffer context
         * This function is internally used. No need to call if from the actual game code.
         */
        setupDisplayForObjects: function () {
            for (let i = 0, len = _objectsArray.length; i < len; i++) {
                _objectsArray[i].setupDisplay();
            }
        }
    }
}());