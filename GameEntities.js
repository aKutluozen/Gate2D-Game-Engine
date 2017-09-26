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
    new Point(0, 0, 0, 0, 0, 'point'),
    new Ball(5, 0, 0, 10, 10, 'ball'),
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
            { name: 'ball', tag: '1', levelID: 3, width: 12, height: 12, z: 0 },
            { name: 'box', tag: '2', levelID: 1, width: 16, height: 16, z: 0 },
            { name: 'box', tag: 'dif', levelID: 5, width: 16, height: 16, z: 0 },
            { name: 'wall', tag: '3', levelID: 4, width: 16, height: 16, z: 0 },
            { name: 'point', tag: '4', levelID: 2, width: 12, height: 12, z: 0 }
        ],
        objectMap: {
            width: 20,
            height: 15,
            gridSize: 16,
            map: [
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 5, 2, 0, 1, 0, 0, 4,
                4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4,
                4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4,
                4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
            ]
        },
    },
    // Create custom levels here
    // ...
]);
