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
    new Pad(200, 320, 50, 10, 'pad', true),
    new Ball(0, 50, 20, 20, 'ball'),
]);

/**
 * All the following added variables can be reached by Globals.<varname>
 * E.g., Globals.score 
 */
Globals.add([
    {score: 0},
    {level: 0}
]);