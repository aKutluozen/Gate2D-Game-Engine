/**
 * @GameDraw.js 
 *
 * GameDraw function is placed in the game loop.
 * It is responsbile for all the drawing actions.
 * 
 * @function        GameDraw - Responsbile for all the drawing actions
 * @author          Ali Kutluozen     
 */

Gate2D.GameDraw = function () {

    'use strict';

    // Draw the background of the level first
    Gate2D.Levels.draw();

    // Draw game objects that have draw methods
    for (let i = 0; i < Gate2D.Levels.currentLevel().objectsList.length; i++) {
        // If there is a camera present, draw them only when they are in the view
        if (Gate2D.Levels.currentLevel().camera) {
            if (Gate2D.Video.isObjectInView(Gate2D.Levels.currentLevel().objectsList[i])) {
                Gate2D.Levels.currentLevel().objectsList[i].draw();
            }
        } else Gate2D.Levels.currentLevel().objectsList[i].draw();
    }

    // Add extra draw calls here
    // ...

    // Draw the HUD on top of everything
    Gate2D.Video.drawText(Gate2D.Timer.formatTime(Gate2D.Timer.time()), "Tahoma", 13, "white", Gate2D.Video.getScreenWidth() / 2, 0, "center", false);

    // Let the video engine render the screen
    Gate2D.Video.render();
}