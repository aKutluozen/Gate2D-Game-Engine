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
    for (let i = 0, len = Gate2D.Levels.currentLevel().objectsList.length; i < len; i++) {
        // If there is a camera present, draw objects only when they are in the view
        if (Gate2D.Levels.currentLevel().camera) {
            if (Gate2D.Video.isObjectInView(Gate2D.Levels.currentLevel().objectsList[i])) {
                Gate2D.Levels.currentLevel().objectsList[i].draw();
            }
        } else Gate2D.Levels.currentLevel().objectsList[i].draw();
    }

    Gate2D.Video.drawText(Gate2D.Globals.score, "Impact", 24, "white", Gate2D.Video.getScreenWidth() / 2, 0, "center", false);

    // Handle game over screen
    if (Gate2D.Engine.gameStatus() === 'off') {
        Gate2D.Video.fade('black', 0, 0.75, 50, function () {
            Gate2D.Engine.pause(true);
            Gate2D.Video.drawText("GAME OVER", "Impact", 64, "white", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 - 24, "center");
        });
    }

    // Let the video engine render the screen
    Gate2D.Video.render();
}