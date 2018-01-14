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
        name: 'controlButton', status: 'active', x: 180, y: 960, width: 360, height: 320,
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
                    cannon.coolDown();
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
        name: 'fireButton', status: 'active', x: 0, y: 1100, width: 180, height: 180,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 0, cropY: 0, cropWidth: 144, cropHeight: 144,
            drawX: 16, drawY: 1116, drawWidth: 144, drawHeight: 144
        },
        trackTouch: false, // Keeps track of touch start, makes sure not every release fires.
        action: function (type) {
            var cannon = Gate2D.Objects.get('cannon');

            switch (type) {
                case 'start': {
                    // Perform when touch starts 
                    cannon.chargeIt();
                    this.trackTouch = true;
                } break;
                case 'move': {
                    // Perform when touch moves
                    // ...
                } break;
                case 'release': {
                    // Perform when touch is released
                    if (this.trackTouch) {
                        cannon.fire();
                        this.trackTouch = false;
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
        name: 'specialButton', status: 'active', x: 540, y: 1140, width: 180, height: 180,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 432, cropY: 0, cropWidth: 144, cropHeight: 144,
            drawX: 560, drawY: 1116, drawWidth: 144, drawHeight: 144
        },
        action: function (type) {
            let cannon = Gate2D.Objects.get('cannon'),
                fireButton = Gate2D.Controls.getOnScreenButton('fireButton'),
                chooseButton = Gate2D.Controls.getOnScreenButton('chooseButton');

            switch (type) {
                case 'start': {
                    // Perform when touch starts 
                    switch (Gate2D.Globals.specialPower) {
                        case 'ghost': {
                            chooseButton.status = 'disabled';
                            fireButton.status = 'disabled';
                            this.status = 'disabled';
                            cannon.fire(true);
                        } break;
                        case 'bomb': {
                            chooseButton.status = 'disabled';
                            fireButton.status = 'disabled';
                            cannon.isBombing = true;
                            this.status = 'disabled';
                            cannon.fire(true);
                        } break;
                        case 'wall': {
                            chooseButton.status = 'disabled';
                            fireButton.status = 'disabled';
                            cannon.isBuildingWall = true;
                            this.status = 'disabled';
                            cannon.fire(true);
                        } break;
                        case 'rapid': {
                            chooseButton.status = 'disabled';
                            fireButton.status = 'disabled';
                            cannon.rapidFire = true;
                            this.status = 'disabled';
                            cannon.fire(true);
                        } break;
                    }
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
    // Weapon choose Button
    {
        name: 'chooseButton', status: 'active', x: 620, y: 1050, width: 64, height: 64,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 576, cropY: 416, cropWidth: 64, cropHeight: 64,
            drawX: 620, drawY: 1050, drawWidth: 64, drawHeight: 64
        },
        action: function (type) {
            switch (type) {
                case 'start': {
                    // Perform when touch starts 

                    // Browse through different powers
                    let power = Gate2D.Globals.specialPower;
                    if (power === 'none') Gate2D.Misc.setupSpecialPower('ghost');
                    if (power === 'ghost') Gate2D.Misc.setupSpecialPower('wall');
                    if (power === 'wall') Gate2D.Misc.setupSpecialPower('bomb');
                    if (power === 'bomb') Gate2D.Misc.setupSpecialPower('rapid');
                    if (power === 'rapid') Gate2D.Misc.setupSpecialPower('none');
                    Gate2D.Controls.getOnScreenButton('specialButton').status = 'active';
                    
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
    // Pause Button
    {
        name: 'pauseButton', status: 'active', x: 608, y: 0, width: 96, height: 96,
        image: {
            image: Gate2D.Loader.getFile('sprites'),
            cropX: 576, cropY: 0, cropWidth: 96, cropHeight: 96,
            drawX: 608, drawY: 0, drawWidth: 96, drawHeight: 96
        },
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
                    Gate2D.Misc.pause();
                } break;
                default: {
                    // Perform when touch is none of the above
                    // ...
                } break;
            }

        }
    }
]);