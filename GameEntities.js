/**
 * @GameEntities.js 
 *
 * Initialization of all the game objects and variables must be done here using
 * Object's and Globals' add method.
 * 
 * @author          Ali Kutluozen
 */

'use strict';

/**
 * All the following added objects can be reached by Objects.<tagname>
 * E.g., GameObject.player 
 */
Objects.add([
    new Pad(200, 400, 64, 16, 'pad', 'player'),
    new Ball(0, 0, 20, 20, 'ball'),
    new Box(0, 0, 50, 50, 'box'),

    // Instantiate custom game objects here
    // ...
]);

/**
 * All the following added variables can be reached by Globals.<varname>
 * E.g., Globals.score 
 */
Globals.add([
    {score: 0},
    {level: 0},
    
    // Create custom game variables here as name-value pairs
    // ...
]);

/**
 * All the following added levels can be reached by Levels.<varname>
 * E.g., Levels.intro1 
 */
Levels.add([
    {
        tag: 'level1',
        width: 640,
        height: 480,
        x: 0,
        y: 0,
        background: 'imgBackground',
        objectsList: [
            {name: 'pad', levelID: 2, x: 200, y: 400, z: 0},
            {name: 'ball', levelID: 3, x: 100, y: 100, z: 0},    
            {name: 'box', levelID: 1, x: 10, y: 10, z: 2},
        ],
        objectMap: {
            width: 8,
            height: 8,
            gridSize: 50,
            map: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 3, 0, 0,
                0, 1, 3, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 2, 1, 1, 1,
                0, 1, 0, 0, 0, 0, 0, 0
            ]
        },
    },
    // Create custom levels here
    // ...
]);
