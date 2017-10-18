/**
 * Timer.js 
 *                  
 * @summary         An interface for timer events
 * @module          Timer
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.Timer = (function () {

    'use strict';

    // Private local variables

    let _time = 0;

    // Timer functions to be exported

    return {
        /**
         * Sets time to a given number or returns it if needed
         * 
         * @param {number}      number - Amount of time in seconds
         * @returns {boolean}
         */
        time: function (number) {
            if (number == undefined)
                return _time;
            _time = number;
        },

        /**
         * Adds a given amount to time
         * 
         * @param {number}      amount - Amount of time to add in seconds
         */
        increaseTimeBy: function (amount) {
            _time += amount;
        },

        /**
         * Subtracts a given amount to time
         * 
         * @param {number}      amount - Amount of time to subtract in seconds
         */
        decreaseTimeBy: function (amount) {
            _time -= amount;
        },

        /**
         * Formats a given time in seconds as Hours:Minutes:Seconds
         * 
         * @param   {number}   time - Amount of seconds to be formatted
         * @returns {string}
         */
        formatTime: function (time) {
            // Hours, minutes and seconds
            let hrs = ~~(time / 3600),
                mins = ~~((time % 3600) / 60),
                secs = time % 60,
                ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },

        /**
         * Sets up a timer
         * 
         * @param {function}    callback - The function that will be running at a given interval
         * @param {number}      interval - The interval of the timer (1000 milliseconds = 1 second)
         */
        setup: function (callback, interval) {
            window.setInterval(function () {
                // Run the callback function as long as the game is not paused
                if (!Gate2D.Manager.gameStatus() === 'on') {
                    if (typeof callback == 'function')
                        callback();
                    else console.warn('Callback is not a function');
                }
            }, interval);
            console.log('Timer is setup');
        }
    }
}());
