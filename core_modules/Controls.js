/**
 * @Controls.js 
 * @author Ali Kutluozen
 *
 * Provides main game entities to be inherited from.
 */

var Controls = (function () {
    
    "use strict";
    
    // Private local variables
    
    let mouse = null;
    
    // Main control module to be exported

    return {
        initControls: function (entities) {
            Video.canvas().addEventListener("mousemove", function (event) {
                mouse = Controls.getMousePos(event);
                for (var i = 0; i < entities.length; i++) {
                    if (entities[i].controlled) {
                        entities[i].handleControls(mouse);
                    }
                }
            });
        },

        getMousePos: function (event) {
            event.preventDefault();
            return {
                x: event.pageX - Video.canvas().offsetLeft,
                y: event.pageY - Video.canvas().offsetTop
            }
        }
    }
}());
