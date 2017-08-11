/**
 * Levels.js 
 * 
 * @summary         Provides an interface to add and keep track of game levels
 * @module          Levels
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Levels = (function () {

    'use strict';

    // Private local variables

    let levels = [],        // Array of levels
        current = null,     // Cursor for the current level
        ctx = null;         // Context that will have the level drawn on

    // Main levels module to be exported

    return {
        /**
         * Returns the game levels array
         * 
         * @returns {array}
         */
        levels: function () {
            return levels;
        },

        /**
         * Returns the current level
         * 
         * @returns {object}
         */
        currentLevel: function () {
            return current;
        },

        /**
         * Assigns the level context for levels to be drawn
         * 
         * @param {object}
         */
        levelContext: function (levelCtx) {
            ctx = levelCtx;
        },

        /**
         * Assigns the level to be played
         * 
         * @param {string}  tag - Name of the level to be played
         */
        select: function (tag) {
            current = Levels.find(tag);

            // THIS WHOLE THING HAS TO BE IN A ONE TIME SETUP FUNCTION NOT DRAW CALL!!!!
                
            // Capture the grid size
            let size = current.objectMap.gridSize;
            
            for (let yPos = 0; yPos < current.objectMap.height; yPos++) {
                for (let xPos = 0; xPos < current.objectMap.width; xPos++) {
                    
                    let objNum = current.objectMap.map[xPos + current.objectMap.width * yPos];

                    for (let i = 0; i < current.objectsList.length; i++) {
                        if (objNum == current.objectsList[i].levelID) {
                            //Draw the found object on that position
                            let objectOnMap = Objects.findByProperty('levelID', objNum);
                            objectOnMap.x = xPos * size;
                            objectOnMap.y = yPos * size;
                        }
                    }
                }
            }
        },

        /**
         * Draws the background of the current level
         */
        draw: function () {
            if (current.background.id != 'grid') {
                ctx.drawImage(current.background, current.x, current.y, current.width, current.height);
            }
        },

        /**
         * Adds an array of level objects
         * 
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
                if (levelList[i].background != '') {
                    levelList[i].background = Loader.getFile(levelList[i].background);
                } else {
                    levelList[i].background = Loader.getFile('grid');
                }

                // Parse objects and place them in their spots within the level
                for (let j = 0; j < levelList[i].objectsList.length; j++) {
                    // Assign data to objects
                    let x = levelList[i].objectsList[j].x,
                        y = levelList[i].objectsList[j].y,
                        z = levelList[i].objectsList[j].z,
                        levelID = levelList[i].objectsList[j].levelID,
                        obj = levelList[i].objectsList[j] = eval("Objects." + levelList[i].objectsList[j].name);
                    
                    // Convert to real object
                    // Assign them object x and y values only if they are not on the map with a levelID
                    obj.x = x;
                    obj.y = y;   
                    obj.z = z;
                    obj.levelID = levelID;
                }
                
                // Add level to the levels array
                levels.push(levelList[i]);

                // Also make them available to outside world through levels
                this[levelList[i].tag] = levelList[i];

                // Arrange the objectsList array based on z (depth) so it draws accordingly
                levelList[i].objectsList = levelList[i].objectsList.sort(function (a, b) {
                    return a.z - b.z;
                });
            }
        },

        /**
         * Finds and returns a level by tag
         * 
         * @param {string}  tag - Name of the level
         * @returns {object}                     
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
