/**
 * GameDraw.js 
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

    // Show score on top of the screen
    Gate2D.Video.drawTint('black', 0.75, 213, 4, 213, 24);
    Gate2D.Video.drawText(
        Gate2D.Levels.currentLevel().name + ' - Score:' + Gate2D.Globals.score, "Impact", 24, "white", Gate2D.Video.getScreenWidth() / 2, 0, "center", false);

    // Handle various screens
    switch (Gate2D.Manager.gameStatus()) {
        case 'waiting': // Waiting
            Gate2D.Video.drawTint('black', 0.75);
            Gate2D.Video.drawText("CLICK TO PLAY!", "Impact", 64, "white", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 - 24, "center");
            break;
        case 'over': // Game over
            Gate2D.Video.fade('black', 0, 0.75, 15, function () {
                Gate2D.Manager.pause(true);
                Gate2D.Video.drawText("GAME OVER!", "Impact", 64, "red", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 - 50, "center");
                Gate2D.Video.drawText("click to play again", "Impact", 32, "gray", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 + 20, "center");
            });
            break;
        case 'won': // Game won
            Gate2D.Video.fade('black', 0, 0.75, 15, function () {
                Gate2D.Manager.pause(true);
                Gate2D.Video.drawText("YOU WIN!", "Impact", 64, "lightgreen", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 - 50, "center");
                Gate2D.Video.drawText("click to play again", "Impact", 32, "gray", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 + 20, "center");
            });
            break;
        case 'paused': // Game paused
            Gate2D.Video.fade('black', 0, 0.75, 15, function () {
                Gate2D.Manager.pause(true);
                Gate2D.Video.drawText("GAME PAUSED", "Impact", 64, "lightgray", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 - 50, "center");
                Gate2D.Video.drawText("click to continue", "Impact", 32, "gray", Gate2D.Video.getScreenWidth() / 2, Gate2D.Video.getScreenHeight() / 2 + 20, "center");
            });
            break;
        default:
            break;
    }

    // Let the video engine render the screen
    Gate2D.Video.render();
}