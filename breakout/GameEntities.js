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
Gate2D.Globals.add([
    { score: 0 },
    { life: 1 },

    // Create custom game variables here as name-value pairs
    // ...
]);

/**
 * A group of objects to be used across levels
 * Level IDs must be assigned here to use them in maps
 */ 
Gate2D.Objects.createGroup('level1ObjectGroup', [
    { object: new Box(0, 0, 0, 64, 32, 'box'), levelID: 1 },
    { object: new Ball(0, 0, 0, 16, 16, 'ball'), levelID: 2 },
    { object: new Pad(0, 0, 0, 128, 16, 'pad', 'player'), levelID: 3 },
    { object: new Wall(0, 0, 0, 32, 32, 'wall'), levelID: 4 },
]);

/**
 * All the following added levels can be reached by Levels.<varname>
 * E.g., Levels.intro1 
 */
Gate2D.Levels.add([
    // Level object
    {
        // Basic size and background information of a level
        name: 'level1',
        width: 640,
        height: 480,
        x: 0,
        y: 0,
        background: 'background',
        objectsList: Gate2D.Objects.getGroup('level1ObjectGroup'),

        // Draw a map for the objects using their level IDs
        objectMap: {
            width: 20,      // Number of cells from left to right
            height: 15,     // Number of cells from top to bottom
            gridSize: 32,   // Size of the cells
            map: [
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4,
                4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4,
                4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4,
                4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4,
                4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4,
                4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4
            ]
        },
    },
    // Create more levels here
    // ...
]);
