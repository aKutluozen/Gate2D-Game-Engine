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
        {name: 'grid', type: 'img', path: 'images/grid.png'},
        {name: 'imgBall', type: 'img', path: 'images/ball.png'},
        {name: 'imgPoint', type: 'img', path: 'images/point.png'},
        {name: 'imgBackground', type: 'img', path: 'images/bg.jpg'},
        {name: 'imgBackground2', type: 'img', path: 'images/bg2.jpg'}
    ],

    // External scripts
    [
        {name: 'pointScript', type: 'script', path: 'custom_objects/point.js'},
        {name: 'boxScript', type: 'script', path: 'custom_objects/box.js'},
        {name: 'ballScript', type: 'script', path: 'custom_objects/ball.js'}
    ]

// Set up and run the engine when all the loading is done
).loadAll(function () {
    
    Engine.setup({
        screenWidth: 480,
        screenHeight: 480,
        mouseEnabled: true,
        keyboardEnabled: true,
        startingLevel: 'level1'
    });

    Timer.setup(function() { Timer.increaseTimeBy(1) }, 1000);    
    Engine.run();
});
