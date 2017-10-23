Gate2D.Misc.executeLevelup = function () {
    Gate2D.Globals.levelUp = true;
    // Put it back to sleep in a second
    window.setTimeout(function () {
        Gate2D.Globals.levelUp = false;
        Gate2D.Controls.getOnScreenButton('fireButton').status = 'active';
        if (Gate2D.Globals.energy < 1) {
            Gate2D.Manager.gameStatus('over');
        }
    }, 1000);
}