/**
 * Timer.js 
 *                  
 * @summary         An interface for timer events
 * @module          Timer
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

var Timer = (function () {

    'use strict';

    // Private local variables

    let time = 0;

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
                return time;
            time = number;
        },

        /**
         * Adds a given amount to time
         * 
         * @param {number}      amount - Amount of time to add in seconds
         */
        increaseTimeBy: function (amount) {
            time += amount;
        },

        /**
         * Subtracts a given amount to time
         * 
         * @param {number}      amount - Amount of time to subtract in seconds
         */
        decreaseTimeBy: function (amount) {
            time -= amount;
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
                if (!Engine.pause()) {
                    if (typeof callback == 'function')
                        callback();
                    else console.warn('Callback is not a function');
                }
            }, interval);
        }
    }
}());
