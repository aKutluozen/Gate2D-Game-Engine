/**
 * @Objects.js 
 * @author Ali Kutluozen
 *
 * Initialization of all the game objects must be done here using
 * GameObject's add method.
 */

'use strict';

/**
 * All the following added objects can be reached by GameObject.<tagname>
 * E.g., GameObject.player 
 */
GameObjects.add([
    new Pad(200, 320, 50, 10, 'pad', true),
    new Ball(0, 50, 20, 20, 'ball'),
]);
