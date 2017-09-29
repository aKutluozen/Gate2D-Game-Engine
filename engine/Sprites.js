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
         * @constructor
         * @param {number}  fps - Frames per second of the animation
         * @param {number}  frames - Amount of frames the animation has - Horizontally
         * @returns {number}
         */
        animation: function (fps, frames) {
            // Local variables
            var frame = 0,
                animation = null,
                states = [];

            // Methods
            this.getFrame = function () {
                return frame;
            };

            this.play = function () {
                if (!animation) {
                    animation = window.setInterval(function () {
                        if (frame < frames) frame++;
                        else frame = 0;
                    }, 1000 / fps);
                }
            };

            this.stop = function () {
                window.clearInterval(animation);
                animation = null;
            };

            this.createState = function (name, beginning, end) {
                states.push({
                    name: name,
                    beginning: beginning,
                    end: end
                });
            };

            this.playState = function (name) {
                for (let i = 0; i < states.length; i++) {
                    if (states[i].name === name) {
                        return states[i];
                    }
                }
                return false;
            }
        }
    }
}());