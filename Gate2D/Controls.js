/**
 * Controls.js 
 *                  
 * @summary         Provides basic control functionalities.
 * @module          Controls
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Controls = (function () {
	"use strict";

	// Following booleans make sure listeners are added only once
	let _keyboardListenerAdded = false,
		_mouseListenerAdded = false,
		_touchListenerAdded = false,
		_onScreenButtonsArray = [],
		_debug = false;

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
				Gate2D.Video.canvas().addEventListener("mousemove", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleMouseMovement(_this.getMousePosition(event));
						}
					}
					_this.listenOnScreenButtons();
				});

				Gate2D.Video.canvas().addEventListener("mousedown", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleMouseDown(_this.getMousePosition(event));
						}
					}
				});

				Gate2D.Video.canvas().addEventListener("mouseup", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleMouseUp(_this.getMousePosition(event));
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
				Gate2D.Video.canvas().addEventListener("touchstart",
					function (event) {
						for (let i = 0, len = entities.length; i < len; i++) {
							if (entities[i].controlled) {
								entities[i].handleMouseDown(_this.getTouchPosition(event));
							}
						}
						_this.listenOnScreenButtons(_this.getTouchPosition(event), 'start');
					}, {
						passive: true
					});

				Gate2D.Video.canvas().addEventListener("touchmove",
					function (event) {
						for (let i = 0, len = entities.length; i < len; i++) {
							if (entities[i].controlled) {
								entities[i].handleMouseMovement(_this.getTouchPosition(event));
							}
						}
						_this.listenOnScreenButtons(_this.getTouchPosition(event), 'move');
					}, {
						passive: true
					});

				Gate2D.Video.canvas().addEventListener("touchend",
					function (event) {
						for (let i = 0, len = entities.length; i < len; i++) {
							if (entities[i].controlled) {
								entities[i].handleMouseUp();
							}
						}
						_this.listenOnScreenButtons(_this.getTouchPosition(event), 'release');
					}, {
						passive: true
					});
				_touchListenerAdded = true;
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
				document.addEventListener("keydown", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleKeyDown(event.keyCode);
						}
					}
				});

				document.addEventListener("keyup", function (event) {
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
				if (Gate2D.Manager.gameStatus() === "on") {
					Gate2D.Manager.gameStatus("paused");
				} else if (Gate2D.Manager.gameStatus() === "paused") {
					Gate2D.Manager.pause(false);
					Gate2D.Manager.gameStatus("on");
				}
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
			};
		},

		/**
		 * Returns the x and y position of the mouse on canvas
		 * 
		 * @param {array}   event - Mouse event
		 * @returns {object}
		 */
		getTouchPosition: function (event) {
			return {
				x: event.changedTouches[0].pageX - Gate2D.Video.canvas().offsetLeft,
				y: event.changedTouches[0].pageY - Gate2D.Video.canvas().offsetTop
			};
		},

	    /**
		 * Adds button area to the buttons array
		 * 
		 * @param {array}   buttons - An array of buttons
		 */
		addOnScreenButton: function (buttons) {
			let i = 0,
				len = buttons.length;

			for (; i < len; i++) {
				_onScreenButtonsArray.push(buttons[i]);
			}

			console.log("Onscreen buttons added:", i);
		},

	    /**
		 * Checks to see if the click position is corresponding to any button
		 * If so, executes the method of that button if the type matches PROBLEM!!!
		 * 
		 * @param {array}   clickPosition - The position of the event
		 */
		listenOnScreenButtons: function (clickPosition, type) {
			if (clickPosition){
				for (let i = 0; i < _onScreenButtonsArray.length; i++) {
					if (clickPosition.x >= _onScreenButtonsArray[i].x &&
						clickPosition.x <= _onScreenButtonsArray[i].x + _onScreenButtonsArray[i].width &&
						clickPosition.y >= _onScreenButtonsArray[i].y &&
						clickPosition.y <= _onScreenButtonsArray[i].y + _onScreenButtonsArray[i].height &&
						type === _onScreenButtonsArray[i].type
					) {
						_onScreenButtonsArray[i].method();
					}
				}
			}
		},

	    /**
		 * Draws the touch buttons on the screen if in the debug mode
		 */
		drawOnScreenButtons: function () {
			if (_debug) {
				for (let i = 0; i < _onScreenButtonsArray.length; i++) {
					Gate2D.Video.drawTint('orange', 0.5, _onScreenButtonsArray[i].x, _onScreenButtonsArray[i].y, _onScreenButtonsArray[i].width, _onScreenButtonsArray[i].height);
				}
			}
		},

        /**
         * Toggles debug mode, returns the value if needed
         * 
         * @returns {boolean}
         */
        debug: function (bool) {
            if (bool == undefined)
                return _debug;
            _debug = bool;
        },
	};
})();