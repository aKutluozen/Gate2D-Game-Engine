/**
 * Engine.js 
 *                  
 * @summary         Brings the game loop elements together
 * @module          Engine
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Engine = (function (GameUpdate, GameDraw, Video) {

    'use strict';

    // Private local variables

    let gamePaused = false;

    // Engine functions to be exported

    return {
        /**
         * Sets up the game engine
         * 
         * @param {Object}  settings - An object of settings as key value pairs
         *                          
         * @property {number}       settings.screenWidth - Name of the level      
         * @property {number}       settings.screenHeight - Width of the level      
         * @property {number}       settings.screenFPS - Height of the level 
         * @property {boolean}      settings.keyboardEnabled - X offset of the level      
         * @property {boolean}      settings.mouseEnabled - Y offset of the level 
         * @property {boolean}      settings.screenDebug - Background image of the level 
         * @property {boolean}      settings.physicsDebug - A list of objects that in the level
         */
        setup: function (settings) {
            // Setup the video
            Video.setup(settings.screenWidth, settings.screenHeight, settings.screenFPS);

            // Handle control setup
            if (settings.keyboardEnabled) {
                Controls.initKeyboardControls(Objects.objects());
            }

            if (settings.mouseEnabled) {
                Controls.initMouseControls(Objects.objects());
            }

            // Handle debug setup
            Video.debug(settings.screenDebug);
            Physics.debug(settings.physicsDebug);

            // Level setup
            Levels.select(settings.startingLevel);
            Levels.levelContext(Video.bufferContext());

            // Connect every object to the buffer context
            for (let i = 0; i < Objects.length(); i++) {
                Objects.objects()[i].setupDisplay();
            }
        },

        /**
         * Runs the main game loop
         */
        run: function () {
            if (!this.gamePaused) {
                Video.refresh();
                GameUpdate();
                GameDraw();
            }
            requestAnimationFrame(this.run.bind(this));
        },

        /**
         * Pauses or unpauses the game, returns the value if needed
         * 
         * @returns {boolean}
         */
        pause: function (bool) {
            if (bool == undefined)
                return this.gamePaused;
            this.gamePaused = bool;
        }
    }
}(GameUpdate, GameDraw, Video));