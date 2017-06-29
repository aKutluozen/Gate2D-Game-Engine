/**
 * @Engine.js 
 * @author Ali Kutluozen
 *
 * This module brings the game loop elements together
 */

var Engine = (function (GameUpdate, GameDraw, Video) {

    'use strict';

    // Private local variables

    let engine = {};

    // Engine functions to be exported

    return {
        /**
         * Sets up the game engine
         * @param {Object} settings - An object of settings as key value pairs
         */
        setup: function (settings) {
            Video.setup(settings.screenWidth, settings.screenHeight, settings.screenFPS);
            Video.debug(settings.screenDebug);

            if (settings.keyboardEnabled) {
                Controls.initKeyboardControls(Objects.objects());
            }

            if (settings.mouseEnabled) {
                Controls.initMouseControls(Objects.objects());
            }

        },

        // Main game loop
        run: function () {
            if (!Globals.paused) {
                requestAnimationFrame(Engine.run);
                Video.refresh();
                GameUpdate();
                GameDraw();
            }
        }
    }
}(GameUpdate, GameDraw, Video));
