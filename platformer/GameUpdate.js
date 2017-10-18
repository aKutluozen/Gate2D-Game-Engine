/**
 * @GameUpdate.js 
 *
 * GameUpdate function is placed in the game loop.
 * It is responsbile for execution of all the game logic.
 * 
 * @function        GameUpdate - Responsbile for execution of all the game logic 
 * @author          Ali Kutluozen
 */

Gate2D.GameUpdate = function () {
    
    'use strict';
    
    // Handles all the object specific action logic
    for (let i = 0; i < Gate2D.Levels.currentLevel().objectsList.length; i++) {
        Gate2D.Levels.currentLevel().objectsList[i].update();
    }
    
    // Add extra game logic here
    // ...
}
