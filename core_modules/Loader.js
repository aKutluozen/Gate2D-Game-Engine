/**
 * Loader.js
 * 
 * @summary         Provides a basic interface for loading files
 * @module          Loader
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Loader = (function () {

    'use strict';

    // Private local variables

    let files = [];

    // Loader module to be exported

    return {
        /**
         * Adds a new file object to the queue to be loaded in order
         * 
         * @param {string}  tag - Tag name to be the id of the created DOM element
         * @param {string}  filetype - Type of the file as an HTML tag - E.g. script, img, audio, etc.
         * @param {string}  filepath - File path - E.g. 'modules/util.js'
         */
        enqueue: function (tag, filetype, filepath) {
            files.push({
                tag: tag,
                filetype: filetype,
                filepath: filepath
            });
        },

        /**
         * Recursively loads each file in the queue ensuring that they are loaded in the right order.
         * Once everything is loaded, then executes a callback function.
         *                  
         * @param {function} callback - Function to be executed upon success
         */
        loadAll: function (callback) {

            let flag = true, // Keeps track to see if anything failed at all
                num = 0; // Number of files loaded

            // Internal recursive function
            function loadThis(number) {

                // Base case: All the files have been loaded - Success!
                if (number === files.length) {
                    console.log('All files have been successfully loaded!');
                    callback();
                    return;
                }

                // Creates the needed file's DOM element
                let file = document.createElement(files[number].filetype);
                file.src = files[number].filepath;
                file.id = files[number].tag;
                document.getElementById('files').appendChild(file);

                // Recursively calls the next file for each successful load
                file.onload = function () {
                    console.log('Loaded: ' + files[number].filepath);
                    return loadThis(++number);
                }

                // Unsuccessful case
                file.onerror = function () {
                    document.getElementById('files').removeChild(file);
                    console.error('Problem loading ' + files[number].filepath);
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
            for (let i = 0; i < filesCallback.length; i++) {
                this.enqueue(filesCallback[i].name, filesCallback[i].type, filesCallback[i].path);
            }

            // Enqueueing core script files - Do not change the order!
            this.enqueue('mathLibrary', 'script', 'core_modules/Math.js');
            this.enqueue('videoModule', 'script', 'core_modules/Video.js');
            this.enqueue('gameControls', 'script', 'core_modules/Controls.js');
            this.enqueue('gamePhysics', 'script', 'core_modules/Physics.js');
            this.enqueue('gameUpdate', 'script', 'GameUpdate.js');
            this.enqueue('gameDraw', 'script', 'GameDraw.js');
            this.enqueue('gameGlobals', 'script', 'core_modules/Globals.js');
            this.enqueue('levels', 'script', 'core_modules/Levels.js');
            this.enqueue('engine', 'script', 'core_modules/Engine.js');
            this.enqueue('timer', 'script', 'core_modules/Timer.js');
            this.enqueue('entity', 'script', 'core_modules/Entity.js');

            // Enqueueing custom script files            
            for (let i = 0; i < scriptsCallback.length; i++) {
                this.enqueue(scriptsCallback[i].name, scriptsCallback[i].type, scriptsCallback[i].path);
            }
            
            // Enqueueing more core script files that will import the game objects 
            this.enqueue('gameObjects', 'script', 'core_modules/Objects.js');
            this.enqueue('gameEntities', 'script', 'GameEntities.js');

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
