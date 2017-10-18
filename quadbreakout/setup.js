/**
 * Bootstrap.js 
 *
 * Loads all the necessary game files, and launches the game when it is all done.
 * Including this script file in an HTML document along with "Loader.js" will run the game.
 * @module          Bootstrap
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

'use strict';

Gate2D.Loader.setEnginePath('../');
Gate2D.Loader.setLocalPath('');

Gate2D.Loader.addFiles(
    // External resources
    [
        { name: 'background', type: 'img', path: 'assets/images/bg.jpg' },
        { name: 'sprites', type: 'img', path: 'assets/images/sprites.png' }
    ],

    // External scripts
    [
        { name: 'boxScript', type: 'script', path: 'assets/objects/box.js' },
        { name: 'ballScript', type: 'script', path: 'assets/objects/ball.js' },
        { name: 'padScript', type: 'script', path: 'assets/objects/pad.js' },
        { name: 'wallScript', type: 'script', path: 'assets/objects/wall.js' },
    ]

    // Set up and run the engine when all the loading is done
).loadAll(function () {

    Gate2D.Engine.setup({
        screenWidth: 640,
        screenHeight: 480,
        mouseEnabled: true,
        keyboardEnabled: true,
        touchEnabled: true,
        startingLevel: 'level1',
        physicsDebug: false,
    });

    Gate2D.Timer.setup(function () { Gate2D.Timer.increaseTimeBy(1) }, 1000);
    Gate2D.Engine.gameStatus('on');
    Gate2D.Engine.run();
});
