/**
 * @GameUpdate.js 
 * @author Ali Kutluozen
 *
 * GameUpdate function is placed in the game loop.
 * It is responsbile for execution of all the game logic.
 */

var GameUpdate = function () {
    
    'use strict';
    
    for (let i = 0; i < Objects.length(); i++) {
        Objects.objects()[i].update();
    }
}
