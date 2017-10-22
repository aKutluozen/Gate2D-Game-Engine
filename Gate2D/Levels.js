/**
 * Levels.js 
 * 
 * @summary         Provides an interface to add and keep track of game levels
 * @module          Levels
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Levels = (function () {

    'use strict';

    // Private local variables

    let _levels = [], // Array of levels
        _current = null, // Cursor for the current level
        _ctx = null, // Context that will have the level drawn on
        _objToFollow = null; // Game object to follow in case there is a camera

    // Main levels module to be exported

    return {
        /**
         * Returns the game levels array
         * 
         * @returns {array}
         */
        levels: function () {
            return _levels;
        },

        /**
         * Returns the current level
         * 
         * @returns {object}
         */
        currentLevel: function () {
            return _current;
        },

        /**
         * Assigns the level context for levels to be drawn
         * 
         * @param {object}
         */
        levelContext: function (levelCtx) {
            _ctx = levelCtx;
        },

        /**
         * Assigns the level to be played
         * 
         * @param {string}      name - Name of the level to be played
         * @param {function}    condition - The condition callback that will determine if the level will be loaded. 
         */
        select: function (name, condition) {

            if (condition() === true) {
                // Get the current level
                _current = this.get(name);
                
                // Set up the background in CSS
                if (_current.background) {
                    Gate2D.Video.canvas().style.background = "url('" + _current.background.src + "') repeat";
                } else {
                    Gate2D.Video.canvas().style.background = "none";
                }

                // Add base objects to be copied from
                Gate2D.Objects.add(_current.objectsList);

                // Capture the grid size
                let size = _current.objectMap.gridSize;

                // Temporary array of copy objects to be created
                let levelObjects = [];

                // One time function
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
                
                for (let yPos = 0, len = _current.objectMap.height; yPos < len; yPos++) {
                    for (let xPos = 0, len = _current.objectMap.width; xPos < len; xPos++) {

                        // Capture the numbers on the map
                        let objNum = _current.objectMap.map[xPos + _current.objectMap.width * yPos];

                        // Get objects by their numbers, assign them their new information
                        if (objNum !== 0) {
                            
                            let objFound = Gate2D.Objects.findByProperty('levelID', objNum);
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
                            Gate2D.Objects.add(newObj);
                            levelObjects.push(newObj); // problem here
                        }
                    }
                }

                // Replace level object list and the Objects module with new level objects
                _current.objectsList = levelObjects.slice();

                // Arrange the objectsList array based on z (depth) so it draws accordingly
                _current.objectsList = _current.objectsList.sort(function (a, b) {
                    return a.z - b.z;
                });

                // Cleaning
                Gate2D.Objects.objects([]); // Empty the pool
                Gate2D.Objects.add(levelObjects); // Fill it with level game objects

                // Connect every object to the buffer context
                Gate2D.Objects.setupDisplayForObjects();

                // Wake up the controls again
                Gate2D.Manager.setupControls();

                // Assign the camera if there is one
                if (_current.camera) {
                    _objToFollow = Gate2D.Objects.findByProperty('tag', _current.camera.objectToFollow);
                    Gate2D.Video.setupCamera(_objToFollow, _current.camera.width, _current.camera.height, _current.camera.bleed);
                }

                console.log('Current level:', _current.name, 'is setup with', levelObjects.length, 'objects');

                levelObjects = []; // Empty the temporary array
            }

        },

        /**
         * Also draws the camera if there is one
         */
        draw: function () {
            if (_current.camera) {
                Gate2D.Video.updateCamera(_objToFollow.coll.x, _objToFollow.coll.y, _objToFollow.width, _objToFollow.height, _current.camera.speed)
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
            let i = 0,
                len = levelList.length;
            for (; i < len; i++) {
                // Load the background image from the string
                if (levelList[i].background != '') {
                    levelList[i].background = Gate2D.Loader.getFile(levelList[i].background);
                } else {
                    levelList[i].background = Gate2D.Loader.getFile('grid');
                }

                // Add level to the levels array
                _levels.push(levelList[i]);

                // Also make them available to outside world through levels
                _levels[levelList[i].name] = levelList[i];
            }

            console.log('Levels added:', i);
        },

        /**
         * Returns a level object with a given name
         * 
         * @param {string}   name - An array of game objects
         * @returns {object}
         */
        get: function (name) {
            return _levels[name] || null;
        }
    }
}());