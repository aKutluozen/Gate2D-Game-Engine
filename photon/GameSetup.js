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
        { name: 'background', type: 'img', path: 'assets/img/bg.png' },
        { name: 'sprites', type: 'img', path: 'assets/img/sprites.png' }
    ],

    // External scripts
    [
        { name: 'enemyScript', type: 'script', path: 'assets/js/enemy.js' },
        { name: 'photonScript', type: 'script', path: 'assets/js/photon.js' },
        { name: 'cannonScript', type: 'script', path: 'assets/js/cannon.js' },
        { name: 'wallScript', type: 'script', path: 'assets/js/wall.js' },
    ]
).loadAll(function () {

    // Set up and run the engine when all the loading is done
    Gate2D.Manager.setup({
        screenWidth: 720,
        screenHeight: 1280,
        mouseEnabled: false,
        keyboardEnabled: false,
        touchEnabled: true,
        startingLevel: 'Level 1',
        physicsDebug: true,
        controlsDebug: false
    });
    
    console.log('Engine is running...');
    Gate2D.UI.switch('touch-to-play');
    Gate2D.Manager.gameStatus('waiting');
    Gate2D.Manager.run();
    Gate2D.Misc.setupSpecialPower('none');
});
