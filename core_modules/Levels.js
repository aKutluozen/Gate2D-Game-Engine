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

    let levels = [], // Array of levels
        current = null, // Cursor for the current level
        ctx = null, // Context that will have the level drawn on
        objToFollow = null; // Game object to follow in case there is a camera

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
         * @param {string}  name - Name of the level to be played
         */
        select: function (name) {
            // Get the current level
            current = Levels.find(name);

            // Capture the grid size
            let size = current.objectMap.gridSize;

            // Temporary array of copy objects to be created
            let levelObjects = [];

            // One time function
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            for (let yPos = 0; yPos < current.objectMap.height; yPos++) {
                for (let xPos = 0; xPos < current.objectMap.width; xPos++) {

                    // Capture the numbers on the map
                    let objNum = current.objectMap.map[xPos + current.objectMap.width * yPos];

                    // Get objects by their numbers, assign them their new information
                    if (objNum !== 0) {
                        let objFound = Objects.findByProperty('levelID', objNum);
                        objFound = objFound.object;

                        // Instantiate new objects out of what is found
                        let newObj = eval('new ' +
                            capitalizeFirstLetter(objFound.name) +
                            '(' + xPos * size + ',' + yPos * size + ',' +
                            objFound.z + ',' +
                            objFound.width + ',' +
                            objFound.height + ',"' +
                            objFound.name + '","' +
                            objFound.tag + '")');

                        // Add them to the lists
                        Objects.add(newObj);
                        levelObjects.push(newObj);
                    }
                }
            }

            // Replace level object list and the Objects module with new level objects
            current.objectsList = levelObjects.slice();

            // Arrange the objectsList array based on z (depth) so it draws accordingly
            current.objectsList = current.objectsList.sort(function (a, b) {
                return a.z - b.z;
            });

            // Cleaning
            Objects.objects([]); // Empty the pool
            Objects.add(levelObjects); // Fill it with level game objects
            levelObjects = []; // Empty the temporary array

            // Assign the camera if there is one
            if (current.camera) {
                objToFollow = Objects.findByProperty('tag', current.camera.objectToFollow);
                Video.setupCamera(objToFollow, current.camera.width, current.camera.height, current.camera.bleed);
            }
        },

        /**
         * Draws the background of the current level
         * Also draws the camera if there is one
         */
        draw: function () {
            if (current.background.id != 'grid') {
                ctx.drawImage(current.background, current.x, current.y, current.width, current.height);
            }
            if (current.camera) {
                Video.updateCamera(objToFollow.coll.x, objToFollow.coll.y, objToFollow.width, objToFollow.height, current.camera.speed)
            }
        },

        /**
         * Adds an array of main level objects
         * 
         * @param {array}   levelObjects - An array of game objects (singular: levelObject)
         *                                                
         * @property {string}   levelObject.name - Name of the level   
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

                // Get objects from the objects list of a given level
                // Add them to the global object pool
                for (let j = 0; j < levelList[i].objectsList.length; j++) {
                    // Assign data to objects
                    Objects.add(levelList[i].objectsList[j]);
                }

                // Add level to the levels array
                levels.push(levelList[i]);

                // Also make them available to outside world through levels
                this[levelList[i].name] = levelList[i];
            }
        },

        /**
         * Finds and returns a level by name
         * 
         * @param {string}  name - Name of the level
         * @returns {object}                     
         */
        find: function (name) {
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].name == name) {
                    return levels[i];
                }
            }
            return null;
        }
    }
}());