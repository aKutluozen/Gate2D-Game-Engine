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
                if (objectsList[i].active) objectsList[i].draw();
            }
        } else {
            if (objectsList[i].active) objectsList[i].draw();
        }
    }

    Video.drawText(Globals.score, gameFont, 54, "white", 24, 16, "left", false);
    Video.drawText(~~Globals.energy, gameFont, 54, "white", screenWidth / 2, screenHeight - 96, "center", false);

    // Draw onscreen buttons
    Controls.drawOnScreenButtons();

    // Let the video engine render the screen
    Video.render();
};
