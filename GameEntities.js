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
 * All the following added objects can be reached by GameObject.<tagname>
 * E.g., GameObject.player 
 */
Objects.add([
    new Room("Level 1", 800, 800, "imgBackground"),
    new Point(100, 200, 20, 20, 'point', true),
    new Ball(100, 100, 20, 20, 'ball'),
    new Box(200, 200, 130, 100, 'box')
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
    }
]);
