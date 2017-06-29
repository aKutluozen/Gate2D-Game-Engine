/**
 * @Main.js 
 * @author Ali Kutluozen
 *
 * Loads all the necessary game files, and launches the game when it is all done.
 * Including this script in an HTML document along with "Loader.js" will run the game.
 */

'use strict';

// Image and audio files must be loaded first!

// Enqueueing the image files
Loader.enqueue('charImg', 'img', 'images/test.jpg');

// Enqueueing the audio files
// ..

// Main object file Entity.js needs to be loaded before anything else inherits from it
Loader.enqueue('entity', 'script', 'core_modules/Entity.js');
Loader.enqueue('gameObjects', 'script', 'core_modules/GameObjects.js');

// Enqueueing custom script files
Loader.enqueue('padScript', 'script', 'pad.js');
Loader.enqueue('ballScript', 'script', 'ball.js');

// Enqueueing core script files
Loader.enqueue('videoModule', 'script', 'core_modules/Video.js');

Loader.enqueue('gameControls', 'script', 'core_modules/Controls.js');
Loader.enqueue('gamePhysics', 'script', 'core_modules/Physics.js');
Loader.enqueue('gameUpdate', 'script', 'GameUpdate.js');
Loader.enqueue('gameDraw', 'script', 'GameDraw.js');
Loader.enqueue('gameGlobals', 'script', 'Globals.js');
Loader.enqueue('objects', 'script', 'Objects.js');
Loader.enqueue('engine', 'script', 'core_modules/Engine.js');

// Load them all
Loader.load(function () {
    // Run the engine
    Engine.run();
});
