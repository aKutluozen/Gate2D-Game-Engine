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
    { level: 0 },

    // Create custom game variables here as name-value pairs
    // ...
]);

/**
 * A group of objects to be used across levels
 * Level IDs must be assigned here to use them in maps
 */ 
Gate2D.Objects.createGroup('level1ObjectGroup', [
    { object: new Player(0, 0, 0, 12, 12, 'player', 'player'), levelID: 3 },
    { object: new Box(0, 0, 0, 32, 16, 'box', 'platformLong'), levelID: 2 },
    { object: new Box(0, 0, 0, 16, 16, 'box', 'platformNormal'), levelID: 1 },
    { object: new Box(0, 0, 0, 16, 16, 'box', 'platformWall'), levelID: 4 },
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
        width: 320,
        height: 240,
        x: 0,
        y: 0,
        background: 'imgBackground',
        objectsList: Gate2D.Objects.getGroup('level1ObjectGroup'),

        // Define a camera for the level
        camera: {
            objectToFollow: 'player',
            width: 240,
            height: 160,
            speed: 2,
            bleed: 16 // Padding around the camera outside the screen
            // bleed should be as big as the object most close to the end of the screen
        },

        // Draw a map for the objects using their level IDs
        objectMap: {
            width: 20,      // Number of cells from left to right
            height: 15,     // Number of cells from top to bottom
            gridSize: 16,   // Size of the cells
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
                4, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 4,
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
