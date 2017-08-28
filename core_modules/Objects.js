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

        get: function (name) {
            return objects[name]; // make this object hing to outside worl open so collisions can work
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

        clone: function (item) {
            if (!item) { return item; } // null, undefined values check

            var types = [Number, String, Boolean],
                result;

            // normalizing primitives if someone did new String('aaa'), or new Number('444');
            types.forEach(function (type) {
                if (item instanceof type) {
                    result = type(item);
                }
            });

            if (typeof result == "undefined") {
                if (Object.prototype.toString.call(item) === "[object Array]") {
                    result = [];
                    item.forEach(function (child, index, array) {
                        result[index] = this.clone(child);
                    });
                } else if (typeof item == "object") {
                    // testing that this is DOM
                    if (item.nodeType && typeof item.cloneNode == "function") {
                        var result = item.cloneNode(true);
                    } else if (!item.prototype) { // check that this is a literal
                        if (item instanceof Date) {
                            result = new Date(item);
                        } else {
                            // it is an object literal
                            result = {};
                            for (var i in item) {
                                result[i] = this.clone(item[i]);
                            }
                        }
                    } else {
                        // depending what you would like here,
                        // just keep the reference, or create new object
                        if (false && item.constructor) {
                            // would not advice to do that, reason? Read below
                            result = new item.constructor();
                        } else {
                            result = item;
                        }
                    }
                } else {
                    result = item;
                }
            }

            return result;
        }
    }
}());
