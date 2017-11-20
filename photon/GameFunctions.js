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
            var fireButton = Gate2D.Controls.getOnScreenButton('fireButton'),
                specialButton = Gate2D.Controls.getOnScreenButton('specialButton'),
                chooseButton = Gate2D.Controls.getOnScreenButton('chooseButton');

            fireButton.status = 'active';
            specialButton.status = 'active';
            chooseButton.status = 'active';

            if (Gate2D.Globals.energy < 10) {
                Gate2D.Manager.gameStatus("over");
            }

            // Create random bonus every once in a while
            for (let i = 0; i < 10; i += ~~(Math.random() * 2 + 1)) {
                if (i === 3) {
                    _this.isBonusComing(true);
                    break;
                } else {
                    _this.isBonusComing(false);
                }
            }
        }, 1000);
    },

    // Retrieve the one bonus object and show it.
    isBonusComing: function (showOrHide) {
        let bonus = Gate2D.Objects.findByProperty('tag', 'bonus');
        if (showOrHide === true) {
            // Bring the bonus down
            bonus.bonusPoints = Gate2D.Math.randomNumber(10, 50);
            bonus.isHitAnimationNumber = 0;
            bonus.life = 1;
            bonus.isDead = false;
            bonus.y = ~~(Math.random() * 750 + 200);
            bonus.x = ~~(Math.random() * 600 + 120);
        } else {
            // Keep the bonus up there
            bonus.y = -400;
            bonus.isHitAnimationNumber = 0;
            bonus.life = 1;
            bonus.isDead = false;
        }
    },

    // Handle cropping the button for the selected power
    setupSpecialPower: function (name) {
        Gate2D.Globals.specialPower = name;
        let buttonImage = Gate2D.Controls.getOnScreenButton('specialButton').image,
            cannon = Gate2D.Objects.get('cannon');

        switch (name) {
            case 'bomb': {
                cannon.isBombing = true;
                cannon.isBuildingWall = false;
                buttonImage.cropX = 560;
                buttonImage.cropY = 128;
            } break;
            case 'ghost': {
                cannon.isBombing = false;
                cannon.isBuildingWall = false;
                buttonImage.cropX = 560;
                buttonImage.cropY = 272;
            } break;
            case 'wall': {
                cannon.isBombing = false;
                cannon.isBuildingWall = true;
                buttonImage.cropX = 560;
                buttonImage.cropY = 480;
            } break;
            default: {
                cannon.isBombing = false;
                cannon.canOverCharge = false;
                cannon.isBuildingWall = false;
                buttonImage.cropX = 432;
                buttonImage.cropY = 0;
            } break;
        }
    },

    touchToPlay: function () {
        Gate2D.Manager.gameStatus('on');
        Gate2D.UI.fadeOut('touch-to-play');
        document.getElementById('ui').style.display = 'none';
    },

    restart: function () {
        Gate2D.Manager.restart();
    },

    continue: function () {
        Gate2D.Manager.pause(false);
        Gate2D.UI.switch('pause-menu').fadeOut('pause-menu');
        document.getElementById('ui').style.display = 'none';
    },

    pause: function () {
        document.getElementById('ui').style.display = 'block';
        Gate2D.Manager.pause(true);
        Gate2D.UI.switch('pause-menu').fadeIn('pause-menu');
    }
};
