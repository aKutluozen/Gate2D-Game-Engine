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
// Engine is loaded from a central location (a directory before) for demo purposes
Gate2D.Loader.setEnginePath('../');
Gate2D.Loader.setLocalPath('');

Gate2D.Loader.addFiles(
    // External resources
    [
        { name: 'grid', type: 'img', path: 'assets/img/grid.png' },
        { name: 'imgPad', type: 'img', path: 'assets/img/pad.png' },
        { name: 'imgBall', type: 'img', path: 'assets/img/ball.png' },
        { name: 'imgPoint', type: 'img', path: 'assets/img/point.png' },
        { name: 'imgBackground', type: 'img', path: 'assets/img/bg.jpg' },
        { name: 'imgBackground2', type: 'img', path: 'assets/img/bg2.jpg' },
        { name: 'imgBlock', type: 'img', path: 'assets/img/block.png' },
        { name: 'imgBricks', type: 'img', path: 'assets/img/bricks.png' },
        { name: 'imgCharacter', type: 'img', path: 'assets/img/character.png' }
    ],

    // External scripts
    [
        { name: 'boxScript', type: 'script', path: 'assets/js/box.js' },
        { name: 'ballScript', type: 'script', path: 'assets/js/ball.js' },
        { name: 'padScript', type: 'script', path: 'assets/js/pad.js' },
        { name: 'wallScript', type: 'script', path: 'assets/js/wall.js' },
        { name: 'pointScript', type: 'script', path: 'assets/js/point.js' }
    ]

    // Set up and run the engine when all the loading is done
).loadAll(function () {

    Gate2D.Engine.setup({
        screenWidth: 320,
        screenHeight: 240,
        mouseEnabled: true,
        keyboardEnabled: true,
        startingLevel: 'level1',
        physicsDebug: false
    });

    Gate2D.Timer.setup(function () { Gate2D.Timer.increaseTimeBy(1) }, 1000);
    Gate2D.Engine.run();
});
