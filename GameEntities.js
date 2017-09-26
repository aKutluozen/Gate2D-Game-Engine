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
        width: 320,
        height: 240,
        x: 0,
        y: 0,
        background: 'imgBackground',
        camera: {
            objectToFollow: 'player',
            width: 120,
            height: 80,
            speed: 0,
        },
        // Instantiate objects for level here
        objectsList: [
            { object: new Ball(0, 0, 0, 12, 12, 'ball', 'player'), levelID: 3 },
            { object: new Box(0, 0, 0, 32, 16, 'box', 'platformLong'), levelID: 2 },
            { object: new Box(0, 0, 0, 16, 16, 'box', 'platformNormal'), levelID: 1 },
            { object: new Box(0, 0, 0, 16, 16, 'box', 'platformWall'), levelID: 4 },
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
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 3, 0, 1, 0, 1, 4,
                4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0, 4,
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
