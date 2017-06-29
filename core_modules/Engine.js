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
    
    // Game settings
    
    Video.setup(640, 360, 60);
    Video.debug(false);
    //Controls.initKeyboardControls(GameObjects.objects());
    
    // Enable controls for the objects
    Controls.initMouseControls(GameObjects.objects());
    
    // Engine functions to be exported

    // Main game loop
    engine.run = function () {
        if (!Globals.paused) {
            requestAnimationFrame(Engine.run);
            Video.refresh();
            GameUpdate();
            GameDraw();
        }
    }

    return engine;
}(GameUpdate, GameDraw, Video));
