/**
 * UserInterface.js
 * 
 * @summary         Provides UI functionalities
 * @module          UI
 * @author          Ali Kutluozen
 * @version         0.1.0
 */

Gate2D.UI = (function () {

    'use strict';

    // Private local variables

    let _screens = {},
        _doc = document;

    // Main globals module to be exported

    return {
        /**
         * Returns the length of the screens array
         * 
         * @returns {number}
         */
        length: function () {
            return _screens.length;
        },

        /**
         * Adds all the elements in UI div to the module
         */
        setup: function () {
            let elements = _doc.getElementById('ui').children;
            for (let i = 0, len = elements.length; i < len; i++) {
                _screens[elements[i].id] = elements[i];
            }
        },

        /**
         * Shows only one screen at a time, turns off all the other screens
         * 
         * @param {string}  screenName - Name of the screen ('' means turn off all the screens)
         */
        switch: function (screenName) {
            for (let name in _screens) {
                if (name === screenName) {
                    _screens[name].style.display = 'block';
                } else {
                    _screens[name].style.display = 'none';
                }
            }
            return this;
        },

        fadeIn: function (screenName) {
            _screens[screenName].classList.remove('fadeOut');
            _screens[screenName].classList.add('fadeIn');
            return this;
        },

        fadeOut: function (screenName) {
            _screens[screenName].classList.remove('fadeIn');
            _screens[screenName].classList.add('fadeOut');
            return this;
        }
    }
}());