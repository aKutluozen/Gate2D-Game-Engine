/**
 * @Main.js 
 * @author Ali Kutluozen
 *
 * Loads all the necessary game files, and launches the game when it is all done.
 * Including this script in an HTML document along with "Loader.js" will run the game.
 */

'use strict';

/* ************ LOADING ALL THE FILES **************************************** */

// Enqueueing the image files
Loader.enqueue('imgBall', 'img', 'images/ball.png');
Loader.enqueue('imgPoint', 'img', 'images/point.png');

// Enqueueing the audio files

// Main object file Entity.js needs to be loaded before anything else inherits from it
Loader.enqueue('entity', 'script', 'core_modules/Entity.js');

// Enqueueing custom script files
Loader.enqueue('padScript', 'script', 'custom_objects/pad.js');
Loader.enqueue('ballScript', 'script', 'custom_objects/ball.js');
Loader.enqueue('hudScript', 'script', 'custom_objects/hud.js');
Loader.enqueue('pointScript', 'script', 'custom_objects/point.js');

// Enqueueing core script files - Do not change the order!
Loader.enqueue('videoModule', 'script', 'core_modules/Video.js');
Loader.enqueue('gameControls', 'script', 'core_modules/Controls.js');
Loader.enqueue('gamePhysics', 'script', 'core_modules/Physics.js');
Loader.enqueue('Objects', 'script', 'core_modules/Objects.js');
Loader.enqueue('gameUpdate', 'script', 'GameUpdate.js');
Loader.enqueue('gameDraw', 'script', 'GameDraw.js');
Loader.enqueue('gameGlobals', 'script', 'core_modules/Globals.js');
Loader.enqueue('objects', 'script', 'GameEntities.js');
Loader.enqueue('engine', 'script', 'core_modules/Engine.js');

/* ************ SETTING UP AND RUNNING THE ENGINE *************************** */

// When the Loader is done loading all the above files, run the engine.
Loader.load(function () {
    
    Engine.setup({
        screenWidth: 400,
        screenHeight: 400,
        screenFPS: 60,
        mouseEnabled: true
    });
    
    Engine.run();
});
