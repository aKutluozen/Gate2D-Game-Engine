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
    
    for (let i = 0; i < Objects.length(); i++) {
        Objects.objects()[i].draw(Video.bufferContext());
    }
    
    showHud(Video.bufferContext());
    
    Video.render();
}
