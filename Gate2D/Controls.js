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
		_onScreenButtonsObjects = {},
		_debug = false;

	// Cache other modules
	let _Video = Gate2D.Video,
		_Manager = Gate2D.Manager,
		_bufferContext = _Video.bufferContext(),
		_status = _Manager.gameStatus();

	// Main control module to be exported
	return {
		/**
		 * Sends mouse coordinates to whoever is listening
		 * 
		 * @param {Object}  entities - An array of game objects
		 */
		initMouseControls: function (entities) {
			// Cache 'this' and necessary elements
			let _this = this,
				_canvas = Gate2D.Video.canvas();

			// Add the listener only once
			if (!_mouseListenerAdded) {
				_canvas.addEventListener("mousemove", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleMouseMovement(_this.getMousePosition(event));
						}
					}
					_this.listenOnScreenButtons();
				});

				_canvas.addEventListener("mousedown", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleMouseDown(_this.getMousePosition(event));
						}
					}
				});

				_canvas.addEventListener("mouseup", function (event) {
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
			// Cache 'this' and necessary elements
			let _this = this,
				_canvas = Gate2D.Video.canvas();

			// Add the listener only once
			if (!_touchListenerAdded) {
				_canvas.addEventListener("touchstart",
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

				_canvas.addEventListener("touchmove",
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

				_canvas.addEventListener("touchend",
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
			// Cache 'this' and necessary elements
			let _this = this,
				_canvas = Gate2D.Video.canvas();

			// Add the listener only once
			if (!_keyboardListenerAdded) {
				_canvas.addEventListener("keydown", function (event) {
					for (let i = 0, len = entities.length; i < len; i++) {
						if (entities[i].controlled) {
							entities[i].handleKeyDown(event.keyCode);
						}
					}
				});

				_canvas.addEventListener("keyup", function (event) {
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
				if (status === "on") {
					_Manager.gameStatus("paused");
				} else if (status === "paused") {
					_Manager.pause(false);
					_Manager.gameStatus("on");
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
			// Cache necessary numbers
			let _canvas = _Video.canvas();

			event.preventDefault();
			return {
				x: event.pageX - _canvas.offsetLeft,
				y: event.pageY - _canvas.offsetTop
			};
		},

		/**
		 * Returns the x and y position of the mouse on canvas
		 * 
		 * @param {array}   event - Mouse event
		 * @returns {object}
		 */
		getTouchPosition: function (event) {
			// Cache necessary numbers
			let _canvas = _Video.canvas(),
				_screenWidth = _Video.getScreenWidth(),
				_deviceWidth = _Video.getDeviceWidth(),
				_screenHeight = _Video.getScreenHeight(),
				_deviceHeight = _Video.getDeviceHeight();

			return {
				x: (event.changedTouches[0].pageX - _canvas.offsetLeft) * (_screenWidth / (_deviceWidth - 2 * _canvas.offsetLeft)),
				y: (event.changedTouches[0].pageY - _canvas.offsetTop) * (_screenHeight / _deviceHeight)
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

				// Also make them accesible to outside world
				_onScreenButtonsObjects[buttons[i].name] = buttons[i];
			}

			console.log("Onscreen buttons added:", i);
		},

	    /**
		 * Checks to see if the click position is corresponding to any button
		 * If so, executes the method of that button based on the event
		 * 
		 * @param {array}   clickPosition - The position of the event
		 * @param {array}   type - Type of the event ('start', 'move', 'release')
		 */
		listenOnScreenButtons: function (clickPosition, type) {
			if (clickPosition) {
				for (let i = 0; i < _onScreenButtonsArray.length; i++) {
					if (clickPosition.x >= _onScreenButtonsArray[i].x &&
						clickPosition.x <= _onScreenButtonsArray[i].x + _onScreenButtonsArray[i].width &&
						clickPosition.y >= _onScreenButtonsArray[i].y &&
						clickPosition.y <= _onScreenButtonsArray[i].y + _onScreenButtonsArray[i].height &&
						_onScreenButtonsArray[i].status === 'active'
					) {
						_onScreenButtonsArray[i].action(type);
					}
				}
			}
		},

	    /**
		 * Draws the touch buttons on the screen if in the debug mode
		 */
		drawOnScreenButtons: function () {
			for (let i = 0; i < _onScreenButtonsArray.length; i++) {
				if (_debug) {
					_Video.drawBox('orange', 0.5, _onScreenButtonsArray[i].x, _onScreenButtonsArray[i].y, _onScreenButtonsArray[i].width, _onScreenButtonsArray[i].height);
				}

				_Video.bufferContext().save();

				// Fade out the disabled button
				if (_onScreenButtonsArray[i].status === 'disabled') {
					_Video.bufferContext().globalAlpha = 0.5;
				} else if (_onScreenButtonsArray[i].status === 'active') {
					_Video.bufferContext().globalAlpha = 1;
				}

				_Video.bufferContext().drawImage(
					_onScreenButtonsArray[i].image.image,
					_onScreenButtonsArray[i].image.cropX,
					_onScreenButtonsArray[i].image.cropY,
					_onScreenButtonsArray[i].image.cropWidth,
					_onScreenButtonsArray[i].image.cropHeight,
					_onScreenButtonsArray[i].image.drawX,
					_onScreenButtonsArray[i].image.drawY,
					_onScreenButtonsArray[i].image.drawWidth,
					_onScreenButtonsArray[i].image.drawHeight,
				);
				_Video.bufferContext().restore();
			}
		},

	    /**
		 * Returns a button if found
		 * @param {string}	name - Name of the button
		 */
		getOnScreenButton: function (name) {
			return _onScreenButtonsObjects[name] || null;
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