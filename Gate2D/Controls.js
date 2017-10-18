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

    // Following booleans make sure listeners are added only once
    let _keyboardListenerAdded = false,
        _mouseListenerAdded = false,
        _touchListenerAdded = false;

    // Main control module to be exported

    return {
        /**
         * Sends mouse coordinates to whoever is listening
         * 
         * @param {Object}  entities - An array of game objects
         */
        initMouseControls: function (entities) {
            let _this = this;
            
            if (!_mouseListenerAdded) {
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
                _mouseListenerAdded = true;
            }
        },

        /**
         * Sends touch coordinates to whoever is listening
         * 
         * @param {Object}  entities - An array of game objects
         */
        initTouchControls: function (entities) {
            let _this = this;

            if (!_touchListenerAdded) {
                Gate2D.Video.canvas().addEventListener('touchstart', function (event) {
                    for (let i = 0, len = entities.length; i < len; i++) {
                        if (entities[i].controlled) {
                            entities[i].handleMouseDown(_this.getTouchPosition(event));
                        }
                    }
                }, {
                    passive: true
                });

                Gate2D.Video.canvas().addEventListener('touchmove', function (event) {
                    for (let i = 0, len = entities.length; i < len; i++) {
                        if (entities[i].controlled) {
                            entities[i].handleMouseMovement(_this.getTouchPosition(event));
                        }
                    }
                }, {
                    passive: true
                });
                _touchListenerAdded = true;
            }
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
            let _this = this;

            if (!_keyboardListenerAdded) {
                document.addEventListener('keydown', function (event) {
                    for (let i = 0, len = entities.length; i < len; i++) {
                        if (entities[i].controlled) {
                            entities[i].handleKeyDown(event.keyCode);
                        }
                    }
                });

                document.addEventListener('keyup', function (event) {
                    _this.keyboardListener(event.keyCode);
                    for (let i = 0, len = entities.length; i < len; i++) {
                        if (entities[i].controlled) {
                            entities[i].handleKeyUp(event.keyCode);
                        }
                    }

                });
                _keyboardListenerAdded = true;
            }
        },

        /**
         * A general input manager for pausing, escaping, etc the game
         * 
         * @param {number}  input - Keycode number to be interpreted
         */
        keyboardListener: function (input) {
            if (input === 27) {
                if (Gate2D.Manager.gameStatus() === 'on') {
                    Gate2D.Manager.gameStatus('paused');
                } else if (Gate2D.Manager.gameStatus() === 'paused') {
                    Gate2D.Manager.pause(false);
                    Gate2D.Manager.gameStatus('on');
                }
            }
        }
    }
}());