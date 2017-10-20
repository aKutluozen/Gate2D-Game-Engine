/**
 * Video.js 
 *                  
 * @summary         Provides a basic interface for canvas API
 * @module          Video     
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Video = (function () {

    'use strict';

    // Private local variables

    // General screen variables
    let _canvas, // Real canvas that will be displayed
        _ctx, // Real canvas context
        _buffer, // Buffer that will be drawn on
        _bctx, // Buffer context
        _width, _height, // Canvas/buffer width and height

        _FPS, // Frames per second to be set
        _counter, // Frame count 
        _counterElement, // DOM element that will display the FPS
        _then, _now, _first, // Frame rate calculation variables
        _interval, // Refreshing interval
        _dt, _et, // Delta time, Elapsed time
        _FPSdep = true, // Toggles FPS dependency

        _debug; // Toggles video debug mode

    // Camera variables
    let _cameraEnabled = false,
        _cameraWidth, // Camera width
        _cameraHeight, // Camera height
        _cameraX, // Camera center x
        _cameraY, // Camera center y
        _cameraBleed; // Padding around the camera to prevent objects from not showing on the edges

    // Fade variables
    let _fadeFrom, // Value that the screen will fade from (0.0 to 1.0)
        _fadeTo, // Value that the screen will fade to (0.0 to 1.0)
        _isFading = false; // Determines if the fading animation is on

    // Main video module to be exported

    return {
        /**
         * Returns canvas
         * 
         * @returns {object}
         */
        canvas: function () {
            return _canvas;
        },

        /**
         * Returns context
         * 
         * @returns {object}
         */
        context: function () {
            return _ctx;
        },

        /**
         * Returns buffer
         * 
         * @returns {object}
         */
        buffer: function () {
            return _buffer;
        },

        /**
         * Returns buffer context
         * 
         * @returns {object}
         */
        bufferContext: function () {
            return _bctx;
        },

        /**
         * Returns frames per second
         * 
         * @returns {object}
         */
        FPS: function () {
            return _FPS;
        },

        /**
         * Returns change in time
         * 
         * @returns {object}
         */
        deltaTime: function () {
            return _dt;
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

        /**
         * Shows the FPS for debugging purposes
         * 
         * @param {number}  timeElapsed - Elapsed time helps calculate the FPS
         */
        showFPS: function (timeElapsed) {
            if (_counterElement != '') {
                _counterElement.innerHTML =
                    ++_counter + 'f / ' +
                    parseInt(timeElapsed) + 's = ' +
                    parseInt(_counter / timeElapsed) + 'fps';
            }
        },

        /**
         * Returns the width of the canvas in pixels
         * 
         * @returns {number}
         */
        getScreenWidth: function () {
            return _canvas.width;
        },

        /**
         * Returns the width of the device in pixels
         * 
         * @returns {number}
         */
        getDeviceWidth: function () {
            return window.innerWidth;
        },

        /**
         * Returns the height of the device in pixels
         * 
         * @returns {number}
         */
        getDeviceHeight: function () {
            return window.innerHeight;
        },

        /**
         * Returns the height of the canvas in pixels
         * 
         * @returns {number}
         */
        getScreenHeight: function () {
            return _canvas.height;
        },

        /**
         * Returns the screen ratio
         * 
         * @returns {number}
         */
        getDeviceRatio: function () {
            return  window.innerWidth / window.innerHeight;
        },

        /**
         * Returns the width of the camera in pixels
         * 
         * @returns {number}
         */
        getCameraWidth: function () {
            return _cameraWidth;
        },

        /**
         * Returns the height of the camera in pixels
         * 
         * @returns {number}
         */
        getCameraHeight: function () {
            return _cameraHeight;
        },

        /**
         * Returns the x position of the camera
         * 
         * @returns {number}
         */
        getCameraX: function () {
            return _cameraX;
        },

        /**
         * Returns the y position of the camera
         * 
         * @returns {number}
         */
        getCameraY: function () {
            return _cameraY;
        },

        /**
         * Returns the number of bleed pixels of camera
         * 
         * @returns {number}
         */
        getCameraBleed: function () {
            return _cameraBleed;
        },

        /**   
         * Initializes the screen
         * 
         * @param {number}  w - Width of the screen
         * @param {number}  h - Height of the screen
         * @param {number}  fps - Frames per second
         */
        setup: function (w, h, fps) {
            // Cache DOM
            let _doc = document,
                _body = document.body;

            // Set up FPS
            _counter = 0;
            _then = Date.now();
            _first = _then;
            if (fps) _FPS = fps;
            else _FPSdep = false;
            _interval = 1000 / _FPS;

            // Set up canvas and context
            _width = w || 640;
            _height = h || 480;

            _debug = false;

            // Set up the buffer
            _buffer = _doc.createElement('canvas');
            _buffer.id = 'game-buffer';
            _buffer.width = _width;
            _buffer.height = _height;
            _bctx = _buffer.getContext('2d');

            // Set up the real canvas
            _canvas = _doc.createElement('canvas');
            _canvas.id = 'game-canvas';
            _canvas.width = _width;
            _canvas.height = _height;
            _ctx = _canvas.getContext('2d');

            _body.appendChild(_canvas);
            _counterElement = _doc.getElementById('counter') || '';
            _ctx.msImageSmoothingEnabled = false;
            _ctx.mozImageSmoothingEnabled = false;
            _ctx.webkitImageSmoothingEnabled = false;
            _ctx.imageSmoothingEnabled = false;

            console.log('Screen is setup');
        },

        /**   
         * Sets up the camera, turns it on
         * 
         * @param {object}  objectToFollow - Object to follow
         * @param {number}  width - Width of the area the camera is going to see
         * @param {number}  height - Height of the area the camera is going to see
         * @param {number}  speed - Camera follow speed
         */
        setupCamera: function (objectToFollow, width, height, bleed) {
            // Turn the camera on 
            _cameraEnabled = true;

            // Assign camera settings
            _cameraX = objectToFollow.x - width / 2;
            _cameraY = objectToFollow.y - height / 2;
            _cameraWidth = width;
            _cameraHeight = height;
            _cameraBleed = bleed;

            console.log('Camera is setup, following:', objectToFollow);
        },

        /**   
         * Keeps the camera position updated
         * 
         * @param {number}  x - X position
         * @param {number}  y - Y position
         * @param {number}  objWidth - Width of the object to follow - Needed to center the camera
         * @param {number}  objHeigth - Height of the object to follow  - Needed to center the camera
         * @param {number}  speed - Speed at which the camera will follow
         */
        updateCamera: function (x, y, objWidth, objHeight, speed) {
            // Stop following when near enough so it doesn't shake
            if ((Math.round(_cameraX) + _cameraWidth / 2 - speed <= x && Math.round(_cameraX) + _cameraWidth / 2 + speed >= x) &&
                (Math.round(_cameraY) + _cameraHeight / 2 - speed <= y && Math.round(_cameraY) + _cameraHeight / 2 + speed >= y)) {
                return;
            }

            // Move towards that position
            var _rotation = Math.atan2(_cameraY - y + _cameraHeight / 2, _cameraX - x + _cameraWidth / 2);
            _cameraX -= Math.cos(_rotation) * speed;
            _cameraY -= Math.sin(_rotation) * speed;

            // Also stop following when at the edge of screens
            if (Math.round(_cameraX) + _cameraWidth >= _buffer.width) {
                _cameraX = _buffer.width - _cameraWidth;
            }
            if (Math.round(_cameraX) < 0) {
                _cameraX = 0;
            }
            if (Math.round(_cameraY) + _cameraHeight >= _buffer.height) {
                _cameraY = _buffer.height - _cameraHeight;
            }
            if (Math.round(_cameraY) < 0) {
                _cameraY = 0;
            }
        },

        /**             
         * Checks if a given object is in the view of the camera
         * 
         * @returns {boolean}
         */
        isObjectInView: function (object) {
            return (
                object.x > _cameraX - _cameraBleed &&
                object.x < _cameraX + _cameraWidth + _cameraBleed &&
                object.y > _cameraY - _cameraBleed &&
                object.y < _cameraY + _cameraHeight + _cameraBleed
            );
        },

        /**             
         * Refreshes the screen on a given FPS
         * 
         * @param {boolean} isFPSDependent - Decides if refreshing is FPS dependent.
         * If true, you must incorporate Video.deltaTime() in game physics.
         */
        refresh: function () {
            if (!_FPSdep) {
                _ctx.clearRect(0, 0, _width, _height);
                _bctx.clearRect(0, 0, _width, _height);
            } else {
                // Calculate the delta time
                _now = Date.now();
                _dt = _now - _then;

                // Limit the FPS
                if (_dt > _interval) {
                    _ctx.clearRect(0, 0, _width, _height);
                    _bctx.clearRect(0, 0, _width, _height);
                    _then = _now - (_dt % _interval);

                    if (_debug) {
                        _et = (_then - _first) / 1000;
                        this.showFPS(_et);
                    }
                }
            }
        },

        /**
         * Draws a given string to the screen.
         * 
         * @param {string}  value - The string to be drawn
         * @param {string}  font - Font of the text
         * @param {number}  size - Size of the text in pixels
         * @param {string}  color - Color of the text (Can be in format of rgb(...) or just "color-name")
         * @param {number}  x - X position of the text
         * @param {number}  y - Y position of the text
         * @param {string}  align - Alignment (Can be "center", "left", or "right")
         * @param {boolean} isStroked - If true (stroked text), next 2 parameters should be filled too to specify.
         * @param {string}  strokeColor - Color of the stroke
         * @param {number}  thickness - Thickness of the stroke
         */
        drawText: function (value, font, size, color, x, y, align, isStroked, strokeColor, thickness) {

            // Draw it according to the camera if there is one
            if (_cameraEnabled) {
                x = _cameraX + _cameraWidth / 2;
                y = _cameraY;
            }

            _bctx.font = size + "px " + font;
            _bctx.fillStyle = color;
            _bctx.textAlign = align;
            _bctx.textBaseline = "top";
            _bctx.fillText(value, x, y);

            if (isStroked) {
                _bctx.strokeStyle = strokeColor;
                _bctx.lineWidth = thickness;
                _bctx.strokeText(value, x, y);
            }
        },

        /**
         * Draws a fade in/out layer on the screen
         * 
         * @param {string}      color - Color of the fade
         * @param {number}      from - Opacity to start from (0.0 to 1.0)
         * @param {number}      to - Opacity to end at (0.0 to 1.0)
         * @param {number}      duration - Duration of the transition (10, 100, 500...)
         * @param {function}    calback - Callback function that will be executed the animation is finished
         */
        fade: function (color, from, to, duration, callback) {
            // Toggle fading, assing the values
            if (!this._isFading) {
                this._isFading = true;
                this._fadeFrom = from;
                this._fadeTo = to;
            }

            // Draw the fade layer on the buffer
            _bctx.save();
            _bctx.fillStyle = color;
            _bctx.globalAlpha = this._fadeFrom;
            _bctx.fillRect(0, 0, _buffer.width, _buffer.height);
            _bctx.restore();

            // Animate the fade in/out, then execute the callback
            if (this._isFading) {
                if (this._fadeFrom <= this._fadeTo) {
                    this._fadeFrom += this._fadeTo / duration;
                } else {
                    this._fadeFrom = this._fadeTo;
                    this._isFading = false;
                    callback();
                    return;
                }
            }
        },

        /**
         * Draws a tint layer on the screen
         * 
         * @param {string}      color - Color of the fade
         * @param {number}      opacity - Opacity to start from (0.0 to 1.0)
         * @param {number}      x - x position of the tint - 0 is default
         * @param {number}      y - y position of the tint - 0 is default
         * @param {number}      width - Width of the tint - Screen size is default
         * @param {number}      height - Height of the tint - Screen size is default
         */
        drawTint: function (color, opacity, x, y, width, height) {
            // Set the defaults
            if (!x) x = 0;
            if (!y) y = 0;
            if (!width) width = _buffer.width;
            if (!height) height = _buffer.height;

            _bctx.save();
            _bctx.fillStyle = color;
            _bctx.globalAlpha = opacity;
            _bctx.fillRect(x, y, width, height);
            _bctx.restore();
        },

        /**
         * Draws everything on the buffer to the actual screen
         * Also handles drawing the camera if there is one
         */
        render: function () {
            if (!_cameraEnabled) {
                _ctx.drawImage(_buffer, 0, 0);
            } else {
                _ctx.drawImage(_buffer, _cameraX, _cameraY, _cameraWidth, _cameraHeight, 0, 0, _canvas.width, _canvas.height);
            }
        }
    }
})();