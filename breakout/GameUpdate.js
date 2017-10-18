/**
 * GameUpdate.js 
 *
 * GameUpdate function is placed in the game loop.
 * It is responsbile for execution of all the game logic.
 * 
 * @function        GameUpdate - Responsbile for execution of all the game logic 
 * @author          Ali Kutluozen
 */

Gate2D.GameUpdate = function () {

    'use strict';

    if (Gate2D.Manager.gameStatus() === 'on') {
        // Handles all the object specific action logic
        for (let i = 0, len = Gate2D.Levels.currentLevel().objectsList.length; i < len; i++) {
            Gate2D.Levels.currentLevel().objectsList[i].update();
        }

        // Add extra game logic here
        // ...
    }

    if (Gate2D.Globals.score == 54) {
        Gate2D.Globals.score = 0;
        Gate2D.Manager.gameStatus('won');
    }

    // Gate2D.Levels.select('level2', function() {
    //     if (Gate2D.Globals.score > 54) {
    //         Gate2D.Globals.score = 0;
    //         return true;
    //     }
    // });
}
