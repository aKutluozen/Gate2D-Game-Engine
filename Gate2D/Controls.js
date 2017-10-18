/**
 * Controls.js 
 *                  
 * @summary         Provides basic control functionalities.
 * @module          Controls
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Controls = (function () {

    'use strict';

    // Main control module to be exported

    return {
        /**
         * Sends mouse coordinates to whoever is listening
         * 
         * @param {Object}  entities - An array of game objects
         */
        initMouseControls: function (entities) {
            let _this = this; // Cache 'this'

            Gate2D.Video.canvas().addEventListener('mousemove', function (event) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleMouseMovement(_this.getMousePosition(event));
                    }
                }
            });

            Gate2D.Video.canvas().addEventListener('mousedown', function (event) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleMouseDown(_this.getMousePosition(event));
                    }
                }
            });
        },

        /**
         * Sends touch coordinates to whoever is listening
         * 
         * @param {Object}  entities - An array of game objects
         */
        initTouchControls: function (entities) {
            let _this = this;

            Gate2D.Video.canvas().addEventListener('touchstart', function (event) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleMouseDown(_this.getTouchPosition(event));
                    }
                }
            }, {passive: true});

            Gate2D.Video.canvas().addEventListener('touchmove', function (event) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleMouseMovement(_this.getTouchPosition(event));
                    }
                }
            }, {passive: true});
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
                x: event.pageX - Gate2D.Video.canvas().offsetLeft,
                y: event.pageY - Gate2D.Video.canvas().offsetTop
            }
        },

        /**
         * Returns the x and y position of the mouse on canvas
         * 
         * @param {array}   event - Mouse event
         * @returns {object}
         */
        getTouchPosition: function (event) {
            return {
                x: event.touches[0].pageX - Gate2D.Video.canvas().offsetLeft,
                y: event.touches[0].pageY - Gate2D.Video.canvas().offsetTop
            }
        },

        /**
         * Sends keycodes to whoever is listening
         * 
         * @param {array}   entities - An array of game objects
         */
        initKeyboardControls: function (entities) {
            let _this = this; // Cache 'this'

            document.addEventListener('keydown', function (event) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleKeyDown(event.keyCode);
                    }
                }

                _this.keyboardListener(event.keyCode);
            });

            document.addEventListener('keyup', function (event) {
                for (let i = 0, len = entities.length; i < len; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleKeyUp(event.keyCode);
                    }
                }
            });
        },

        /**
         * A general input manager for pausing, escaping, etc the game
         * 
         * @param {number}  input - Keycode number to be interpreted
         */
        keyboardListener: function (input) {
            if (input === 27) {
                Gate2D.Engine.pause(!Gate2D.Engine.pause());
            }
        }
    }
}());
