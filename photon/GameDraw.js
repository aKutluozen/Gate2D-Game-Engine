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
    "use strict";

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
        screenHeight = Video.getScreenHeight(),
        gameFont = "Photon";

    // Draw the background of the level first
    Levels.draw();

    // Draw some miscellaneous backgrounds and images needed
    Video.drawStaticImages();

    // Draw game objects that have draw methods
    for (let i = 0; i < objectsLength; i++) {
        // If there is a camera present, draw objects only when they are in the view
        if (currentLevel.camera) {
            if (Video.isObjectInView(objectsList[i])) {
                objectsList[i].draw();
            }
        } else objectsList[i].draw();
    }

    Video.drawText(Globals.score, gameFont, "bold " + 48, "white", screenWidth - 24, 16, "right", false);
    Video.drawText(~~Globals.energy, gameFont, "bold " + 48, "white", 24, 20, "left", false);

    // Draw onscreen buttons
    Controls.drawOnScreenButtons();

    // Handle various screens
    switch (status) {
        case "waiting": // Waiting
            Video.drawBox("black", 0.75);
            Video.drawText("TAP TO PLAY!", gameFont, 88, "white", screenWidth / 2, screenHeight / 2 - 50, "center");
            break;
        case "over": // Game over
            Video.fade("black", 0, 0.75, 15, function () {
                Manager.pause(true);
                Video.drawText("GAME OVER!", gameFont, 100, "red", screenWidth / 2, screenHeight / 2 - 100, "center");
                Video.drawText("tap to play again", gameFont, 64, "gray", screenWidth / 2, screenHeight / 2 + 20, "center");
            });
            break;
        case "won": // Game won
            Video.fade("black", 0, 0.75, 15, function () {
                Manager.pause(true);
                Video.drawText("YOU WIN!", gameFont, 64, "lightgreen", screenWidth / 2, screenHeight / 2 - 50, "center");
                Video.drawText("tap to play again", gameFont, 32, "gray", screenWidth / 2, screenHeight / 2 + 20, "center");
            });
            break;
        case "paused": // Game paused
            Video.fade("black", 0, 0.75, 15, function () {
                Manager.pause(true);
                Video.drawText("GAME PAUSED", gameFont, 64, "lightgray", screenWidth / 2, screenHeight / 2 - 50, "center");
                Video.drawText("tap to continue", gameFont, 32, "gray", screenWidth / 2, screenHeight / 2 + 20, "center");
            });
            break;
        default:
            break;
    }

    // Let the video engine render the screen
    Video.render();
};
