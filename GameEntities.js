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
    new Pad(0, 0, 0, 64, 16, 'pad', 'player'),
    new Ball(5, 0, 0, 20, 20, 'ball'),
    new Box(20, 0, 0, 50, 50, 'box'),
    new Wall(0, 0, 0, 50, 50, 'wall')
    // Instantiate custom game objects here
    // ...
]);

/**
 * All the following added variables can be reached by Globals.<varname>
 * E.g., Globals.score 
 */
Globals.add([
    { score: 0 },
    { level: 0 },

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
            { name: 'pad', levelID: 2, width: 64, height: 8,  z: 0 },
            { name: 'ball', levelID: 3, width: 10, height: 10, z: 0 },
            { name: 'box', levelID: 1, width: 50, height: 50, z: 0 },
            { name: 'wall', levelID: 4, width: 50, height: 50, z: 0 }
        ],
        objectMap: {
            width: 8,
            height: 8,
            gridSize: 50,
            map: [
                4, 4, 4, 4, 4, 4, 4, 4,
                4, 1, 1, 1, 1, 1, 1, 4,
                4, 1, 1, 1, 1, 1, 1, 4,
                4, 1, 1, 1, 1, 1, 1, 4,
                4, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 3, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 2, 0, 0, 4
            ]
        },
    },
    // Create custom levels here
    // ...
]);
