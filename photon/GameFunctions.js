/**
 * GameFunctions.js 
 *
 * Declaration of all game functions must be done here in the Misc object.
 * 
 * @author          Ali Kutluozen
 */

Gate2D.Misc = {
    executeLevelup: function () {
        Gate2D.Globals.levelUp = true;
        // Put it back to sleep in a second
        window.setTimeout(function () {
            Gate2D.Globals.levelUp = false;
            Gate2D.Controls.getOnScreenButton("fireButton").status = "active";
            if (Gate2D.Globals.energy < 10) {
                Gate2D.Manager.gameStatus("over");
            }
        }, 1000);
    },

    touchToPlay: function () {
        Gate2D.Manager.gameStatus('on');
        Gate2D.UI.fadeOut('touch-to-play');
    },

    restart: function () {
        Gate2D.Manager.restart();
    },

    continue: function () {
        Gate2D.Manager.pause(false);
        Gate2D.UI.switch('pause-menu').fadeOut('pause-menu');
    },

    pause: function () {
        Gate2D.Manager.pause(true);
        Gate2D.UI.switch('pause-menu').fadeIn('pause-menu');
    }
};
