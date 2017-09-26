/**
 * Sprites.js
 * 
 * @summary         Provides a basic sprite functions
 * @module          Sprites
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Sprites = (function () {

    'use strict';

    return {
        /**
         * Returns animation object with functions
         * 
         * @param {number}  a - Length of side a
         * @param {number}  b - Length of side b
         * @returns {number}
         */
        setupAnimation: function (frames, fps) {
            let frame = 0;

            let animation = window.setInterval( function() {
                if (frame < frames) {
                    frame++;
                } else {
                    frame = 0;
                }
            }, 1000/fps);

            
        }
    }
}());