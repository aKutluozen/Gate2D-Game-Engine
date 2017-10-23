/**
 * GameControls.js 
 * 
 * Decleration of onscreen game buttons. 
 * 
 * @author          Ali Kutluozen
 */

Gate2D.Controls.addOnScreenButton([
    // Control Button
    {
        name: 'controlButton', status: 'disabled', x: 180, y: 960, width: 360, height: 320,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 0, cropY: 0, cropWidth: 32, cropHeight: 32,
            drawX: 0, drawY: 0, drawWidth: 180, drawHeight: 180
        },
        action: function (type) {
            let cannon = Gate2D.Objects.get('cannon');

            switch (type) {
                case 'start': {
                    // Perform when touch starts
                    if (cannon.overHeat) {
                        cannon.coolDown();
                    }
                } break;
                case 'move': {
                    // Perform when touch moves
                    cannon.rotate();
                } break;
                case 'release': {
                    // Perform when touch is released
                    // ...
                } break;
                default: {
                    // Perform when touch is none of the above
                    // ...
                } break;
            }
        }
    },
    // Fire Button
    {
        name: 'fireButton', status: 'disabled', x: 0, y: 1100, width: 180, height: 180,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 0, cropY: 0, cropWidth: 144, cropHeight: 144,
            drawX: 16, drawY: 1116, drawWidth: 144, drawHeight: 144
        },
        action: function (type) {
            let cannon = Gate2D.Objects.get('cannon');

            switch (type) {
                case 'start': {
                    // Perform when touch starts 
                    if (!cannon.overHeat) {
                        cannon.charging(true); // Charge the cannon
                    }
                } break;
                case 'move': {
                    // cannon.charging(false);
                    // Perform when touch moves
                    // ...
                } break;
                case 'release': {
                    // Perform when touch is released
                    if (!cannon.overHeat) {
                        cannon.charging(false); // Release the cannon
                        Gate2D.Objects.get('photon').fire(cannon.power()); // Fire the photon with cannon power
                        cannon.isFiring = true;
                        this.status = 'disabled'; // Disable the fire button until the photon is out
                    }
                } break;
                default: {
                    // Perform when touch is none of the above
                    // ...
                } break;
            }

        }
    },
    // Special Button
    {
        name: 'specialButton', status: 'disabled', x: 0, y: 1100, width: 180, height: 180,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 432, cropY: 0, cropWidth: 144, cropHeight: 144,
            drawX: 560, drawY: 1116, drawWidth: 144, drawHeight: 144
        },
        action: function (type) {
            switch (type) {
                case 'start': {
                    // Perform when touch starts 
                    // ...
                } break;
                case 'move': {
                    // Perform when touch moves
                    // ...
                } break;
                case 'release': {
                    // Perform when touch is released
                    // ...
                } break;
                default: {
                    // Perform when touch is none of the above
                    // ...
                } break;
            }

        }
    },
    // 'Tap to play' Button
    {
        name: 'tapToPlayButton', status: 'active', x: 0, y: 0, width: 720, height: 1280,
        action: function (type) {
            let Manager = Gate2D.Manager,
                Controls = Gate2D.Controls;
            switch (type) {
                case 'start': {
                    // Perform when touch starts 
                    // ...
                } break;
                case 'move': {
                    // Perform when touch moves
                    // ...
                } break;
                case 'release': {
                    // Perform when touch is released
                    // ...
                    Manager.gameStatus('on');
                    this.status = 'disabled';
                    Controls.getOnScreenButton('fireButton').status = 'active';
                    Controls.getOnScreenButton('specialButton').status = 'active';
                    Controls.getOnScreenButton('controlButton').status = 'active';
                } break;
                default: {
                    // Perform when touch is none of the above
                    // ...
                } break;
            }

        }
    }
]);