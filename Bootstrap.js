/**
 * @Main.js 
 * @author Ali Kutluozen
 *
 * Loads all the necessary game files, and launches the game when it is all done.
 * Including this script in an HTML document along with "Loader.js" will run the game.
 */

"use strict";

// Queue the files needed first
Loader.enqueue('core_modules/Entity.js');
Loader.enqueue('core_modules/Video.js');
Loader.enqueue('core_modules/GameObjects.js');
Loader.enqueue('core_modules/Controls.js');
Loader.enqueue('GameUpdate.js');
Loader.enqueue('GameDraw.js');
Loader.enqueue('Globals.js');
Loader.enqueue('Objects.js');
Loader.enqueue('core_modules/Engine.js');

// Load them all
Loader.load(function () {
    // Run the engine
    Engine.run();
});
