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
    
    // Draw the background of the level first
    Levels.draw();
    
    // Draw game objects that draw functions
    for (let i = 0; i < Levels.currentLevel().objectsList.length; i++) {
        Levels.currentLevel().objectsList[i].draw();
    }
    
    // Add extra draw calls here
    // ...
    
    // Draw the HUD on top of everything
    Video.drawText(Timer.formatTime(Timer.time()), "Arial", 40, "white", 320, 10, "center", false);
    
    // Let the video engine render the screen
    Video.render();
}
