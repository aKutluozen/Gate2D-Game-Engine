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

Loader.addFiles(
    // External resources
    [
        { name: 'grid', type: 'img', path: 'assets/images/grid.png' },
        { name: 'imgPad', type: 'img', path: 'assets/images/pad.png' },
        { name: 'imgBall', type: 'img', path: 'assets/images/ball.png' },
        { name: 'imgPoint', type: 'img', path: 'assets/images/point.png' },
        { name: 'imgBackground', type: 'img', path: 'assets/images/bg.jpg' },
        { name: 'imgBackground2', type: 'img', path: 'assets/images/bg2.jpg' },
        { name: 'imgBlock', type: 'img', path: 'assets/images/block.png' },
        { name: 'imgBricks', type: 'img', path: 'assets/images/bricks.png' },
        { name: 'imgCharacter', type: 'img', path: 'assets/images/character.png' }
    ],

    // External scripts
    [
        { name: 'boxScript', type: 'script', path: 'assets/objects/box.js' },
        { name: 'ballScript', type: 'script', path: 'assets/objects/ball.js' },
        { name: 'padScript', type: 'script', path: 'assets/objects/pad.js' },
        { name: 'wallScript', type: 'script', path: 'assets/objects/wall.js' },
        { name: 'pointScript', type: 'script', path: 'assets/objects/point.js' }
    ]

    // Set up and run the engine when all the loading is done
).loadAll(function () {

    Engine.setup({
        screenWidth: 320,
        screenHeight: 240,
        mouseEnabled: true,
        keyboardEnabled: true,
        startingLevel: 'level1',
        physicsDebug: false
    });

    Timer.setup(function () { Timer.increaseTimeBy(1) }, 1000);
    Engine.run();
});
