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
    Levels.draw(Video.bufferContext());
    
    // Draw game objects
    for (let i = 0; i < Levels.currentLevel().objectsList.length; i++) {
        Levels.currentLevel().objectsList[i].draw(Video.bufferContext());
    }
    
    // Add extra draw calls here
    // ...
    
    // Draw the HUD on top of everything
    showHud(Video.bufferContext());
    
    // Let the video engine render the screen
    Video.render();
}
