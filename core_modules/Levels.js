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
            // Get the current level
            current = Levels.find(tag);

            // Capture the grid size
            let size = current.objectMap.gridSize;

            // Temporary array of copy objects to be created
            let levelObjects = [];

            for (let yPos = 0; yPos < current.objectMap.height; yPos++) {
                for (let xPos = 0; xPos < current.objectMap.width; xPos++) {

                    // Capture the numbers on the map
                    let objNum = current.objectMap.map[xPos + current.objectMap.width * yPos];

                    // Get objects by their numbers, assign them their new information
                    if (objNum !== 0) {
                        let newObj = Objects.clone(Objects.findByProperty('levelID', objNum));
                        
                        // Delete the ones that were added in the beginning
                        //delete Objects[newObj.name];

                        // Assign information to them with their new name
                        //newObj.name += '__' + xPos * yPos + Math.random()*1 + 1000; // Anything after '__' will be cut in the Physics module
                        newObj.x = xPos * size;
                        newObj.y = yPos * size;

                        Objects.add(newObj);
                        levelObjects.push(newObj);
                    }
                }
            }

            // Replace level object list and the Objects module with new level objects
            this.currentLevel().objectsList = levelObjects.slice();
            Objects.objects([]);
            Objects.add(levelObjects);

            // Arrange the objectsList array based on z (depth) so it draws accordingly
            this.currentLevel().objectsList = this.currentLevel().objectsList.sort(function (a, b) {
                return a.z - b.z;
            });

            console.log('Objects module: ', Objects, 'Original objects: ', Objects.objects(), 'Level objects: ', this.currentLevel().objectsList);
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
         * Adds an array of main level objects
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
                        width = levelList[i].objectsList[j].width,
                        height = levelList[i].objectsList[j].height,
                        levelID = levelList[i].objectsList[j].levelID,
                        obj = levelList[i].objectsList[j] = Objects.findByProperty('name', levelList[i].objectsList[j].name);
                    
                    // Convert to real object, assign neccessary position values
                    obj.x = x;
                    obj.y = y;
                    obj.z = z;
                    obj.width = obj.coll.width = width;
                    obj.height = obj.coll.height = height;
                    obj.coll.z = z;
                    obj.levelID = levelID;
                }

                // Add level to the levels array
                levels.push(levelList[i]);

                // Also make them available to outside world through levels
                this[levelList[i].tag] = levelList[i];

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
