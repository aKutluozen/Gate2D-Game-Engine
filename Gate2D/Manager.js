/**
 * Manager.js 
 *                  
 * @summary         Brings the game loop elements together
 * @module          Engine
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Manager = (function () {

    'use strict';

    // Private local variables

    let _gamePaused = false, // Controls if the game really stops or not
        _gameStatus = 'on', // Game status variable
        _settings = null; // Managers global settings object

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
            // Cache game settings
            _settings = settings;

            // Setup the video
            Gate2D.Video.setup(settings.screenWidth, settings.screenHeight, settings.screenFPS);

            // Handle debug setup
            Gate2D.Video.debug(settings.screenDebug);
            Gate2D.Physics.debug(settings.physicsDebug);

            // Level setup
            Gate2D.Levels.select(settings.startingLevel, function () {
                return true;
            });
            Gate2D.Levels.levelContext(Gate2D.Video.bufferContext());

            // Connect the context the buffer for the first time
            Gate2D.Objects.setupDisplayForObjects();
        },

        setupControls: function () {
            if (_settings.keyboardEnabled) {
                Gate2D.Controls.initKeyboardControls(Gate2D.Objects.objects());
            }

            if (_settings.mouseEnabled) {
                Gate2D.Controls.initMouseControls(Gate2D.Objects.objects());
            }

            if (_settings.touchEnabled) {
                Gate2D.Controls.initTouchControls(Gate2D.Objects.objects());
            }

            console.log('Controls are setup. ' +
                '\nKeyboard: ', _settings.keyboardEnabled,
                '\nMouse: ', _settings.mouseEnabled,
                '\nTouch: ', _settings.touchEnabled,
            );
        },

        /**
         * Runs the main game loop
         */
        run: function () {
            if (!this._gamePaused) {
                Gate2D.GameUpdate();
                Gate2D.Video.refresh();
                Gate2D.GameDraw();
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
                return this._gamePaused;
            this._gamePaused = bool;
        },

        /**
         * Assigns or returns the status of the game
         * 
         * @param {string}  status - Status of the game. (on, over, won, paused, ...more is coming)
         */
        gameStatus: function (status) {
            if (status == undefined) {
                return this._gameStatus;
            }
            this._gameStatus = status;
        }
    }
}());