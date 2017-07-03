/**
 * @GameEntities.js 
 * @author Ali Kutluozen
 *
 * Initialization of all the game objects and variables must be done here using
 * Object's and Globals' add method.
 */

'use strict';

/**
 * All the following added objects can be reached by GameObject.<tagname>
 * E.g., GameObject.player 
 */
Objects.add([
    new Point(100, 200, 20, 20, 'point', true),
    new Ball(200, 200, 20, 20, 'ball')
]);

/**
 * All the following added variables can be reached by Globals.<varname>
 * E.g., Globals.score 
 */
Globals.add([
    {gamePaused: false},
    {score: 0},
    {level: 0}
]);