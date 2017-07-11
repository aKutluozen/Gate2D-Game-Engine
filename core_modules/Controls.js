/**
 * Controls.js 
 *                  
 * @summary         Provides basic control functionalities.
 * @module          Controls
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Controls = (function () {

    'use strict';

    // Main control module to be exported

    return {
        /**
         * Sends mouse coordinates to whoever is listening
         * 
         * @param {Object}  entities - An array of game objects
         */
        initMouseControls: function (entities) {
            let self = this; // Cache 'this'
            
            Video.canvas().addEventListener('mousemove', function (event) {
                for (let i = 0; i < entities.length; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleMouseMovement(self.getMousePosition(event));
                    }
                }
            });

            Video.canvas().addEventListener('mousedown', function (event) {
                for (let i = 0; i < entities.length; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleMouseDown(self.getMousePosition(event));
                    }
                }
            });
        },

        /**
         * Returns the x and y position of the mouse on canvas
         * 
         * @param {array}   event - Mouse event
         * @returns {object}
         */
        getMousePosition: function (event) {
            event.preventDefault();
            return {
                x: event.pageX - Video.canvas().offsetLeft,
                y: event.pageY - Video.canvas().offsetTop
            }
        },

        /**
         * Sends keycodes to whoever is listening
         * 
         * @param {array}   entities - An array of game objects
         */
        initKeyboardControls: function (entities) {
            document.addEventListener('keydown', function (event) {
                for (let i = 0; i < entities.length; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleKeyDown(event.keyCode);
                    }
                }
            });

            document.addEventListener('keyup', function (event) {
                for (let i = 0; i < entities.length; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleKeyUp(event.keyCode);
                    }
                }
            });
        }
    }
}());
