/**
 * @GameUpdate.js 
 *
 * GameUpdate function is placed in the game loop.
 * It is responsbile for execution of all the game logic.
 * 
 * @function        GameUpdate - Responsbile for execution of all the game logic 
 * @author          Ali Kutluozen
 */

var GameUpdate = function () {
    
    'use strict';
    
    // Handles all the object specific action logic
    for (let i = 0; i < Levels.currentLevel().objectsList.length; i++) {
        Levels.currentLevel().objectsList[i].update();
    }
    
    // Add extra game logic here
    // ...
    
    if (Timer.time() != 0 && Timer.time() % 5 == 0) {
        Objects.ball.speed += 0.01;
    }
}
