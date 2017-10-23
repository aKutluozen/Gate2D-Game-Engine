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

    // Cache
    let Levels = Gate2D.Levels,
        Globals = Gate2D.Globals,
        Manager = Gate2D.Manager,
        currentLevel = Levels.currentLevel(),
        objectsList = currentLevel.objectsList,
        objectsLength = objectsList.length;

    // Execute the physics if the game is on
    if (Manager.gameStatus() === 'on' || Manager.gameStatus() === 'waiting') {
        // Handles all the object specific action logic
        for (let i = 0; i < objectsLength; i++) {
            objectsList[i].update();
        }
    }
}