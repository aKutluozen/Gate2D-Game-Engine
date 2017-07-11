/**
 * @GameDraw.js 
 *
 * GameDraw function is placed in the game loop.
 * It is responsbile for all the drawing actions.
 * 
 * @function        GameDraw - Responsbile for all the drawing actions
 * @author          Ali Kutluozen     
 */

var GameDraw = function () {
    
    'use strict';
    
    // Draw the background of the Level first
    Levels.draw();
    
    // Draw game objects
    for (let i = 0; i < Levels.currentLevel().objectsList.length; i++) {
        Levels.currentLevel().objectsList[i].draw();
    }
    
    // Add extra draw calls here
    // ...
    
    // Draw the HUD on top of everything
    drawOnHUD(Timer.time(), "Arial", 50, "white", 10, 10, "left", true, "black", 2);
    
    // Let the video engine render the screen
    Video.render();
}
