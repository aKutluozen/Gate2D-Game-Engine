/**
 * Engine.js 
 *                  
 * @summary         Brings the game loop elements together
 * @module          Engine
 * @author          Ali Kutluozen
 * @version         7/5/2017
 */

var Engine = (function (GameUpdate, GameDraw, Video) {

    'use strict';

    // Private local variables

    let engine = {};

    // Engine functions to be exported

    return {
        /**
         * @description     Sets up the game engine
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
            Video.setup(settings.screenWidth, settings.screenHeight, settings.screenFPS);

            if (settings.keyboardEnabled) {
                Controls.initKeyboardControls(Objects.objects());
            }

            if (settings.mouseEnabled) {
                Controls.initMouseControls(Objects.objects());
            }

            Video.debug(settings.screenDebug);
            Physics.debug(settings.physicsDebug);

            Levels.play(settings.startingLevel);
        },

        /**
         * @description     Runs the main game loop
         */
        run: function () {
            if (!Globals.gamePaused) {
                requestAnimationFrame(Engine.run);
                Video.refresh();
                GameUpdate();
                GameDraw();
            }
        }
    }
}(GameUpdate, GameDraw, Video));
