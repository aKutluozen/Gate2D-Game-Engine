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
    new Point(100, 200, 20, 20, 'point', true),
    new Ball(100, 100, 20, 20, 'ball'),
    // Instantiate custom game objects here
    // ...
]);

/**
 * All the following added variables can be reached by Globals.<varname>
 * E.g., Globals.score 
 */
Globals.add([
    {
        gamePaused: false
    },
    {
        score: 0
    },
    {
        level: 0
    },
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
        width: 600,
        height: 400,
        x: 0,
        y: 0,
        background: Loader.getFile('imgBackground'),
        objectsList: [
            Objects.ball,
            Objects.point
        ]
    },
    // Create custom levels here
    // ...
]);
