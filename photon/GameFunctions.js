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
        let _this = this;

        // Put it back to sleep in a second
        window.setTimeout(function () {
            Gate2D.Globals.levelUp = false;
            var fireButton = Gate2D.Controls.getOnScreenButton('buttonSet1', 'fireButton'),
                specialButton = Gate2D.Controls.getOnScreenButton('buttonSet1', 'specialButton'),
                chooseButton = Gate2D.Controls.getOnScreenButton('buttonSet1', 'chooseButton');

            fireButton.status = 'active';
            specialButton.status = 'active';
            chooseButton.status = 'active';

            if (Gate2D.Globals.energy < 10) {
                Gate2D.Manager.gameStatus("over");
            }

            // Reset score multiplier
            Gate2D.Globals.bonusMultiplier = 1;
            Gate2D.Globals.sameColorHits = 0;

            // Create random bonus every once in a while
            for (let i = 0; i < 20; i += Gate2D.Math.randomNumber(1, 3)) {
                if (i === 10) {
                    _this.isBonusComing(true);
                    break;
                }
                else {
                    _this.isBonusComing(false);
                }
            }

            // Decrease the shield number by one.
            if (Gate2D.Globals.isWallActive) {
                if (Gate2D.Globals.shieldUsed <= Gate2D.Globals.maxShieldRounds - 1) {
                    Gate2D.Globals.shieldUsed++;
                } else {
                    Gate2D.Globals.isWallActive = false;
                    Gate2D.Globals.wallY = 0;
                    Gate2D.Globals.shieldUsed = 0;
                    Gate2D.Objects.findByProperty('tag', 'photonWall').active = false;
                }
            }

        }, 1000);
    },

    // Retrieve the one bonus object and show it.
    isBonusComing: function (showOrHide) {
        // Choose a random bonus
        let bonus = null;
        let randomPower = Gate2D.Math.randomNumber(0, 3);
        // let randomPower = 2;

        switch (randomPower) {
            case 0: {
                bonus = Gate2D.Objects.findByProperty('tag', 'bonusPower');
                bonus.bonusPower = Gate2D.Math.randomNumber(10, 50);
            } break;
            case 1: {
                bonus = Gate2D.Objects.findByProperty('tag', 'bonusCool');
                bonus.bonusCool = Gate2D.Math.randomNumber(10, 50);

            } break;
            case 2: {
                bonus = Gate2D.Objects.findByProperty('tag', 'bonusMultiplier');
                bonus.bonusMultiplier = Gate2D.Math.randomNumber(2, 4);
            } break;
        }

        if (showOrHide === true) {
            // Bring the bonus down
            bonus.y = Gate2D.Math.randomNumber(100, 325);
            bonus.x = Gate2D.Math.randomNumber(60, 300);
        } else {
            // Keep the bonus up there
            bonus.y = -400;
            bonus.x = -400;
        }

        bonus.isHitAnimationNumber = 0;
        bonus.life = 1;
        bonus.isDead = false;
    },

    // Handle cropping the button for the selected power
    setupSpecialPower: function (name) {
        Gate2D.Globals.specialPower = name;
        let buttonImage = Gate2D.Controls.getOnScreenButton('buttonSet1', 'specialButton').image,
            cannon = Gate2D.Objects.get('cannon');

        // Reset all the cannon features
        cannon.isBombing = false;
        cannon.isBuildingWall = false;
        cannon.rapidFire = false;

        switch (name) {
            case 'bomb': {
                cannon.isBombing = true;
                buttonImage.cropX = 560;
                buttonImage.cropY = 128;
            } break;
            case 'ghost': {
                buttonImage.cropX = 560;
                buttonImage.cropY = 272;
            } break;
            case 'wall': {
                cannon.isBuildingWall = true;
                buttonImage.cropX = 560;
                buttonImage.cropY = 480;
            } break;
            case 'rapid': {
                buttonImage.cropX = 560;
                buttonImage.cropY = 624;
            } break;
            default: {
                buttonImage.cropX = 432;
                buttonImage.cropY = 0;
            } break;
        }
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
