/**
 * Levels.js 
 * 
 * @summary         Provides an interface to add and keep track of game levels
 * @module          Levels
 * @author          Ali Kutluozen
 * @version         7/10/2017
 */

var Levels = (function () {

    'use strict';

    // Private local variables

    let levels = [],
        current = null;

    // Main levels module to be exported

    return {
        /**
         * @description     Returns the game levels array
         * @returns {array}
         */
        levels: function () {
            return levels;
        },

        /**
         * @description     Returns the current level
         * @returns {object}
         */
        currentLevel: function () {
            return current;
        },

        /**
         * @description     Assigns the level to be played
         * @param {string}  tag - Name of the level to be played
         */
        play: function (tag) {
            current = Levels.find(tag);
        },

        /**
         * @description     Draws the background of the current level
         * @param {object}  context - Context to draw on
         */
        draw: function (context) {
            context.drawImage(current.background, current.x, current.y, current.width, current.height);
        },

        /**
         * @description     Adds an array of level objects
         * @param {array}   levelObjects - An array of game objects (singular: levelObject)
         *                                                
         * @property {string}   levelObject.tag - Name of the level      
         * @property {number}   levelObject.width - Width of the level      
         * @property {number}   levelObject.height - Height of the level 
         * @property {number}   levelObject.x - X offset of the level      
         * @property {number}   levelObject.y - Y offset of the level 
         * @property {string}   levelObject.background - Background image of the level 
         * @property {Array}    levelObject.objectsList - A list of objects that in the level
         */
        add: function (levelList) {
            for (let i = 0; i < levelList.length; i++) {
                // Load the background image from the string
                levelList[i].background = Loader.getFile(levelList[i].background);
                
                for (let j = 0; j < levelList[i].objectsList.length; j++) {
                    // Convert string to object
                    levelList[i].objectsList[j] = eval("Objects." + levelList[i].objectsList[j]);
                }
                
                levels.push(levelList[i]);

                // Also make them available to outside world through levels
                this[levelList[i].tag] = levelList[i];
            }
        },

        /**
         * @description     Finds and returns a level by tag
         * @param {string}  tag - Name of the level
         */
        find: function (tag) {
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].tag == tag) {
                    return levels[i];
                }
            }
            return null;
        }
    }
}());
