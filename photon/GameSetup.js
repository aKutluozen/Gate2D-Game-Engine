/**
 * GameSetup.js 
 *
 * Loads all the necessary game files, and launches the game when it is all done.
 * Including this script file in an HTML document along with "Loader.js" will run the game.
 *
 * @author          Ali Kutluozen
 */

'use strict';

// Engine is loaded from a central location (a directory before) for demo purposes
Gate2D.Loader.setEnginePath('../');
Gate2D.Loader.setLocalPath('');

Gate2D.Loader.addFiles(
    // External resources
    [
        { name: 'background', type: 'img', path: 'assets/img/bg.jpg' },
        { name: 'sprites', type: 'img', path: 'assets/img/sprites.png' }
    ],

    // External scripts
    [
        { name: 'boxScript', type: 'script', path: 'assets/js/box.js' },
        { name: 'ballScript', type: 'script', path: 'assets/js/ball.js' },
        { name: 'padScript', type: 'script', path: 'assets/js/cannon.js' },
        { name: 'wallScript', type: 'script', path: 'assets/js/wall.js' },
    ]
).loadAll(function () {

    // Set up and run the engine when all the loading is done
    Gate2D.Manager.setup({
        screenWidth: 720,
        screenHeight: 1280,
        mouseEnabled: true,
        keyboardEnabled: true,
        touchEnabled: true,
        startingLevel: 'Level 1',
        physicsDebug: false,
        controlsDebug: true
    });

    console.log('Engine is running...');
    Gate2D.Manager.gameStatus('waiting');
    Gate2D.Manager.run();
});
