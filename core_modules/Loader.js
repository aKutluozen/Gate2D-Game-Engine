/**
 * @Loader.js 
 * @author Ali Kutluozen
 *
 * Provides a basic interface for loading files
 */

var Loader = (function () {
    
    "use strict";
    
    // Private local variables
    
    let files = [], 
        loaded = 0;

    // Loader module to be exported
    
    return {
        // Puts them in a queue to be loaded in order
        enqueue: function (filepath) {
            files.push(filepath);
        },

        // Loads each file in the queue, then executes the main callback function
        load: function (run) {
            let flag = true; // Keeps track to see if anything failed at all

            for (let i = 0; i < files.length; i++) {
                let script = document.createElement('script');
                script.src = files[i];
                
                script.onload = function () {
                    console.log('Loaded: ' + files[i]);
                    if (i == files.length - 1) {
                        if (flag) {
                            console.log('All files have been successfully loaded!');
                            run(); // Callback
                        } else {
                            console.log('There has been a problem loading files');
                        }
                    }
                }
                
                script.onerror = function () {
                    flag = false;
                    console.log('Problem loading ' + files[i]);
                    // If the file has a problem, removes it from DOM
                    document.body.removeChild(script);
                }
                
                // Finally add it to DOM
                document.body.appendChild(script);
            }
        }
    }
})();
