/**
 * Gate2D.js 
 *                  
 * @summary         Creates the namespace for the engine
 * @module          Gate2D
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Loader = (function () {

    'use strict';

    // Private local variables

    let _files = [],        // Container array for engine/game files
        _enginePath = '',   // Path for engine files
        _localPath = '';    // Path for local files

    /**
     * Adds a new file object to the queue to be loaded in order
     * This function is internally used. No need to call if from the actual game code.
     * 
     * @param {string}  tag - Tag name to be the id of the created DOM element
     * @param {string}  filetype - Type of the file as an HTML tag - E.g. script, img, audio, etc.
     * @param {string}  filepath - File path - E.g. 'modules/util.js'
     */
    function _enqueue(tag, filetype, filepath) {
        _files.push({
            tag: tag,
            filetype: filetype,
            filepath: filepath
        });
    }

    // Loader module to be exported

    return {

        /**
         * Sets a global path for core files to be loaded (Useful for multiple projects in one folder)
         * 
         * @param {string}  path - Folder path - E.g. 'modules/util.js'
         */
        setEnginePath: function (path) {
            _enginePath = path;
        },

        /**
         * Sets a global path for local game files to be loaded (Useful for multiple projects in one folder)
         * 
         * @param {string}  path - Folder path - E.g. 'objects/ball.js'
         */
        setLocalPath: function (path) {
            _localPath = path;
        },

        /**
         * Recursively loads each file in the queue ensuring that they are loaded in the right order.
         * Once everything is loaded, then executes a callback function.
         *                  
         * @param {function} callback - Function to be executed upon success
         */
        loadAll: function (callback) {

            let flag = true, // Keeps track to see if anything failed at all
                num = 0, // Number of files loaded
                loadLocation = document.getElementById('files'); // Where to load the files

            // Internal recursive function
            function loadThis(number) {

                // Base case: All the files have been loaded - Success!
                if (number === _files.length) {
                    console.log('All files have been successfully loaded!');
                    callback();
                    return;
                }

                // Creates the needed file's DOM element
                let file = document.createElement(_files[number].filetype);
                file.src = _files[number].filepath;
                file.id = _files[number].tag;
                file.setAttribute('defer', '');
                loadLocation.appendChild(file);

                // Recursively calls the next file for each successful load
                file.onload = function () {
                    console.log('Loaded: ' + _files[number].filepath);
                    return loadThis(++number);
                }

                // Unsuccessful case
                file.onerror = function () {
                    document.getElementById('files').removeChild(file);
                    console.error('Problem loading ' + _files[number].filepath);
                    return null;
                }
            }

            loadThis(num); // Start the loading
        },

        /**
         * Enqueues all the files and returns the module to be linked with loadAll function
         * 
         * @param   {Array}  filesCallback   - An array of objects of media resources to be loaded
         * @param   {Array}  scriptsCallback - An array of objects of script resources to be loaded
         * @returns {object}
         */
        addFiles: function (filesCallback, scriptsCallback) {

            // Enqueueing the external resources first (image, audio, etc.)
            for (let i = 0, len = filesCallback.length; i < len; i++) {
                _enqueue(filesCallback[i].name, filesCallback[i].type, _localPath + filesCallback[i].path);
            }

            // Enqueueing core script files - Do not change the order!
            _enqueue('engine', 'script', _enginePath + 'Gate2D/Manager.js');
            _enqueue('mathLibrary', 'script', _enginePath + 'Gate2D/Math.js');
            _enqueue('videoModule', 'script', _enginePath + 'Gate2D/Video.js');
            _enqueue('gameControls', 'script', _enginePath + 'Gate2D/Controls.js');
            _enqueue('gamePhysics', 'script', _enginePath + 'Gate2D/Physics.js');
            _enqueue('gameGlobals', 'script', _enginePath + 'Gate2D/Globals.js');
            _enqueue('gameUpdate', 'script', _localPath + 'GameUpdate.js');
            _enqueue('gameDraw', 'script', _localPath + 'GameDraw.js');
            _enqueue('gameDraw', 'script', _localPath + 'GameControls.js');
            _enqueue('levels', 'script', _enginePath + 'Gate2D/Levels.js');
            _enqueue('timer', 'script', _enginePath + 'Gate2D/Timer.js');
            _enqueue('sprites', 'script', _enginePath + 'Gate2D/Sprites.js');
            _enqueue('entity', 'script', _enginePath + 'Gate2D/Misc.js');
            _enqueue('entity', 'script', _enginePath + 'Gate2D/Entity.js');
            _enqueue('entity', 'script', _enginePath + 'Gate2D/UserInterface.js');

            // Enqueueing custom script files            
            for (let i = 0, len = scriptsCallback.length; i < len; i++) {
                _enqueue(scriptsCallback[i].name, scriptsCallback[i].type, _localPath + scriptsCallback[i].path);
            }

            // Enqueueing more core script files that will import the game objects 
            _enqueue('gameObjects', 'script', _enginePath + 'Gate2D/Objects.js');
            _enqueue('gameEntities', 'script', _localPath + 'GameEntities.js');
            _enqueue('gameEntities', 'script', _localPath + 'GameFunctions.js');

            // To be chained with load function
            return this;
        },

        /**
         * Returns the loaded file element for further use
         * 
         * @param {string}  tag - Tag/id name of the DOM element needed
         * @returns {object}
         */
        getFile: function (tag) {
            return document.getElementById(tag);
        }
    }
})();
