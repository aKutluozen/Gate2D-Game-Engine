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

    // Cache needed modules and methods
    let Levels = Gate2D.Levels,
        Video = Gate2D.Video,
        Globals = Gate2D.Globals,
        Controls = Gate2D.Controls,
        Manager = Gate2D.Manager,
        status = Manager.gameStatus(),
        currentLevel = Levels.currentLevel(),
        objectsList = currentLevel.objectsList,
        objectsLength = objectsList.length,
        screenWidth = Video.getScreenWidth(),
        screenHeight = Video.getScreenHeight();

    // Draw the background of the level first
    Levels.draw();

    // Draw game objects that have draw methods
    for (let i = 0; i < objectsLength; i++) {
        // If there is a camera present, draw objects only when they are in the view
        if (currentLevel.camera) {
            if (Video.isObjectInView(objectsList[i])) {
                objectsList[i].draw();
            }
        } else objectsList[i].draw();
    }

    // Show score on top of the screen
    Video.drawTint('black', 0.75, 213, 4, 213, 24);
    Video.drawText(
        currentLevel.name + ' - Score:' + Globals.score, "Impact", 24, "white", screenWidth / 2, 0, "center", false);

    // Handle various screens
    switch (status) {
        case 'waiting': // Waiting
            Video.drawTint('black', 0.75);
            Video.drawText("CLICK TO PLAY!", "Impact", 64, "white", screenWidth / 2, screenHeight / 2 - 24, "center");
            break;
        case 'over': // Game over
            Video.fade('black', 0, 0.75, 15, function () {
                Manager.pause(true);
                Video.drawText("GAME OVER!", "Impact", 64, "red", screenWidth / 2, screenHeight / 2 - 50, "center");
                Video.drawText("click to play again", "Impact", 32, "gray", screenWidth / 2, screenHeight / 2 + 20, "center");
            });
            break;
        case 'won': // Game won
            Video.fade('black', 0, 0.75, 15, function () {
                Manager.pause(true);
                Video.drawText("YOU WIN!", "Impact", 64, "lightgreen", screenWidth / 2, screenHeight / 2 - 50, "center");
                Video.drawText("click to play again", "Impact", 32, "gray", screenWidth / 2, screenHeight / 2 + 20, "center");
            });
            break;
        case 'paused': // Game paused
            Video.fade('black', 0, 0.75, 15, function () {
                Manager.pause(true);
                Video.drawText("GAME PAUSED", "Impact", 64, "lightgray", screenWidth / 2, screenHeight / 2 - 50, "center");
                Video.drawText("click to continue", "Impact", 32, "gray", screenWidth / 2, screenHeight / 2 + 20, "center");
            });
            break;
        default:
            break;
    }

    Controls.drawOnScreenButtons();

    // Let the video engine render the screen
    Video.render();
}