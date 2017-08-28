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

    let canvas,             // Real canvas that will be displayed
        ctx,                // Real canvas context
        buffer,             // Buffer that will be drawn on
        bctx,               // Buffer context
        width, height,      // Canvas/buffer width and height

        FPS,                // Frames per second to be set
        counter,            // Frame count 
        counterElement,     // DOM element that will display the FPS
        then, now, first,   // Frame rate calculation variables
        interval,           // Refreshing interval
        dt, et,             // Delta time, Elapsed time
        FPSdep = false,     // Toggles FPS dependency

        debug;              // Toggles video debug mode

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
            if (fps) FPS = fps; else FPSdep = true;
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
         */
        render: function () {
            ctx.drawImage(buffer, 0, 0);
        }
    }
})();
