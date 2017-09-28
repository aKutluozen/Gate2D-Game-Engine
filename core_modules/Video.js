/**
 * Video.js 
 *                  
 * @summary         Provides a basic interface for canvas API
 * @module          Video     
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Video = (function () {

    'use strict';

    // Private local variables

    // General screen variables
    let canvas, // Real canvas that will be displayed
        ctx, // Real canvas context
        buffer, // Buffer that will be drawn on
        bctx, // Buffer context
        width, height, // Canvas/buffer width and height

        FPS, // Frames per second to be set
        counter, // Frame count 
        counterElement, // DOM element that will display the FPS
        then, now, first, // Frame rate calculation variables
        interval, // Refreshing interval
        dt, et, // Delta time, Elapsed time
        FPSdep = false, // Toggles FPS dependency

        debug; // Toggles video debug mode

    // Camera variables
    let cameraEnabled = false,
        cameraWidth, // Camera width
        cameraHeight, // Camera height
        cameraX, // Camera center x
        cameraY, // Camera center y
        cameraBleed; // Padding around the camera to prevent objects from not showing on the edges

    // Main video module to be exported

    return {
        /**
         * Returns canvas
         * 
         * @returns {object}
         */
        canvas: function () {
            return canvas;
        },

        /**
         * Returns context
         * 
         * @returns {object}
         */
        context: function () {
            return ctx;
        },

        /**
         * Returns buffer
         * 
         * @returns {object}
         */
        buffer: function () {
            return buffer;
        },

        /**
         * Returns buffer context
         * 
         * @returns {object}
         */
        bufferContext: function () {
            return bctx;
        },

        /**
         * Returns frames per second
         * 
         * @returns {object}
         */
        FPS: function () {
            return FPS;
        },

        /**
         * Returns change in time
         * 
         * @returns {object}
         */
        deltaTime: function () {
            return dt;
        },

        /**
         * Toggles debug mode, returns the value if needed
         * 
         * @returns {boolean}
         */
        debug: function (bool) {
            if (bool == undefined)
                return debug;
            debug = bool;
        },

        /**
         * Shows the FPS for debugging purposes
         * 
         * @param {number}  timeElapsed - Elapsed time helps calculate the FPS
         */
        showFPS: function (timeElapsed) {
            if (counterElement != '') {
                counterElement.innerHTML =
                    ++counter + 'f / ' +
                    parseInt(timeElapsed) + 's = ' +
                    parseInt(counter / timeElapsed) + 'fps';
            }
        },

        /**
         * Returns the width of the canvas in pixels
         * 
         * @returns {number}
         */
        getScreenWidth: function () {
            return canvas.width;
        },

        /**
         * Returns the height of the canvas in pixels
         * 
         * @returns {number}
         */
        getScreenHeight: function () {
            return canvas.height;
        },

        /**
         * Returns the width of the camera in pixels
         * 
         * @returns {number}
         */
        getCameraWidth: function () {
            return cameraWidth;
        },

        /**
         * Returns the height of the camera in pixels
         * 
         * @returns {number}
         */
        getCameraHeight: function () {
            return cameraHeight;
        },

        /**
         * Returns the x position of the camera
         * 
         * @returns {number}
         */
        getCameraX: function () {
            return cameraX;
        },

        /**
         * Returns the y position of the camera
         * 
         * @returns {number}
         */
        getCameraY: function () {
            return cameraY;
        },

        /**
         * Returns the number of bleed pixels of camera
         * 
         * @returns {number}
         */
        getCameraBleed: function () {
            return cameraBleed;
        },

        /**   
         * Initializes the screen
         * 
         * @param {number}  w - Width of the screen
         * @param {number}  h - Height of the screen
         * @param {number}  fps - Frames per second
         */
        setup: function (w, h, fps) {
            // Set up FPS
            counter = 0;
            then = Date.now();
            first = then;
            if (fps) FPS = fps;
            else FPSdep = true;
            interval = 1000 / FPS;

            // Set up canvas and context
            width = w || 640;
            height = h || 480;

            debug = false;

            // Set up the buffer
            buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            bctx = buffer.getContext('2d');

            // Set up the real canvas
            canvas = document.createElement('canvas');
            canvas.id = 'game-canvas';
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            document.body.appendChild(canvas);
            counterElement = document.getElementById('counter') || '';
            ctx.msImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
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
            cameraEnabled = true;

            // Assign camera settings
            cameraX = objectToFollow.x - width / 2;
            cameraY = objectToFollow.y - height / 2;
            cameraWidth = width;
            cameraHeight = height;
            cameraBleed = bleed;
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
            if ((Math.round(cameraX) + cameraWidth / 2 - speed <= x && Math.round(cameraX) + cameraWidth / 2 + speed >= x) &&
                (Math.round(cameraY) + cameraHeight / 2 - speed <= y && Math.round(cameraY) + cameraHeight / 2 + speed >= y)) {
                return;
            }

            // Move towards that position
            var rotation = Math.atan2(cameraY - y + cameraHeight / 2, cameraX - x + cameraWidth / 2);
            cameraX -= Math.cos(rotation) * speed;
            cameraY -= Math.sin(rotation) * speed;

            // Also stop following when at the edge of screens
            if (Math.round(cameraX) + cameraWidth >= buffer.width) {
                cameraX = buffer.width - cameraWidth;
            }
            if (Math.round(cameraX) < 0) {
                cameraX = 0;
            }
            if (Math.round(cameraY) + cameraHeight >= buffer.height) {
                cameraY = buffer.height - cameraHeight;
            }
            if (Math.round(cameraY) < 0) {
                cameraY = 0;
            }
        },

        /**             
         * Checks if a given object is in the view of the camera
         * 
         * @returns {boolean}
         */
        isObjectInView: function(object) {
            return (
                object.x > cameraX - cameraBleed &&
                object.x < cameraX + cameraWidth + cameraBleed &&
                object.y > cameraY - cameraBleed &&
                object.y < cameraY + cameraHeight + cameraBleed
            );
        },

        /**             
         * Refreshes the screen on a given FPS
         * 
         * @param {boolean} isFPSDependent - Decides if refreshing is FPS dependent.
         * If true, you must incorporate Video.deltaTime() in game physics.
         */
        refresh: function () {
            if (!FPSdep) {
                ctx.clearRect(0, 0, width, height);
                bctx.clearRect(0, 0, width, height);
            } else {
                // Calculate the delta time
                now = Date.now();
                dt = now - then;

                // Limit the FPS
                if (dt > interval) {
                    ctx.clearRect(0, 0, width, height);
                    bctx.clearRect(0, 0, width, height);
                    then = now - (dt % interval);

                    if (debug) {
                        et = (then - first) / 1000;
                        this.showFPS(et);
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
            if (cameraEnabled) {
                x = cameraX + cameraWidth / 2;
                y = cameraY;
            }

            bctx.font = size + "px " + font;
            bctx.fillStyle = color;
            bctx.textAlign = align;
            bctx.textBaseline = "top";
            bctx.fillText(value, x, y);

            if (isStroked) {
                bctx.strokeStyle = strokeColor;
                bctx.lineWidth = thickness;
                bctx.strokeText(value, x, y);
            }
        },

        /**
         * Draws everything on the buffer to the actual screen
         * Also handles drawing the camera if there is one
         */
        render: function () {
            if (!cameraEnabled) {
                ctx.drawImage(buffer, 0, 0);
            } else {
                ctx.drawImage(buffer, cameraX, cameraY, cameraWidth, cameraHeight, 0, 0, canvas.width, canvas.height);
            }
        }
    }
})();