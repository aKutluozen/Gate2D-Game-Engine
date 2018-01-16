/**
 * Sprites.js
 * 
 * @summary         Provides a basic sprite functions
 * @module          Sprites
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Sprites = (function () {

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
        animation: function (sprite, cropX, cropY, cropWidth, cropHeight, drawX, drawY, drawWidth, drawHeight, numberOfFrames) {
            // Local variables
            var currentFrame = 0,
                states = [];

            // Methods
            this.getFrame = function () {
                return currentFrame;
            };

            this.play = function () {
                if (currentFrame < numberOfFrames) currentFrame++;
                else currentFrame = 0;
                sprite.drawImage(sprite, cropX + (currentFrame * cropWidth), cropY, cropWidth, cropHeight, drawX, drawY, drawWidth, drawHeight);
            };

            this.createState = function (name, beginning, end) {
                states.push({
                    name: name,
                    beginning: beginning,
                    end: end
                });
            };

            this.playState = function (name) {
                for (let i = 0, len = states.length; i < len; i++) {
                    if (states[i].name === name) {
                        return states[i];
                    }
                }
                return false;
            };
        }
    }
}());