/**
 * @Loader.js 
 * @author Ali Kutluozen
 *
 * Provides a basic interface for loading files
 */

var Loader = (function () {

    "use strict";

    // Private local variables

    let files = [];

    // Loader module to be exported

    return {
        /**
         * Adds a new file object to the queue to be loaded in order
         * @param {string} tag - Tag name to be the id of the created DOM element
         * @param {string} filetype - Type of the file as an HTML tag - E.g. script, img, audio, etc.
         * @param {string} filepath - File path - E.g. 'modules/util.js'
         */
        enqueue: function (tag, filetype, filepath) {
            files.push({
                tag: tag,
                filetype: filetype,
                filepath: filepath
            });
        },

        /**
         * Recursively loads each file in the queue ensuring that they are loaded in the right order
         * Once everything is loaded, then executes a callback function
         * @param {function} callback - Function to be executed upon success
         */
        load: function (callback) {

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
                document.body.appendChild(file);

                // Recursively calls the next file for each successful load
                file.onload = function () {
                    document.body.appendChild(file);
                    console.log('Loaded: ' + files[number].filepath);
                    return loadThis(++number);
                }

                // Unsuccessful case
                file.onerror = function () {
                    document.body.removeChild(file);
                    console.log('Problem loading ' + files[number].filepath);
                    return null;
                }
            }

            loadThis(num); // Start the loading
        },

        /**
         * Returns the loaded file element for further use
         * @param {string} tag - Tag/id name of the DOM element needed
         */
        getFile: function (tag) {
            return document.getElementById(tag);
        }
    }
})();
