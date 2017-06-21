/**
 * @GameObjects.js 
 * @author Ali Kutluozen
 *
 * Provides an interface to add and keep track of game objects
 */

var GameObjects = (function () {
    
    "use strict";

    // Private local variables

    let objects = [];
    
    // Main objects module to be exported

    return {
        add: function (object) {
            objects.push(object);
        },

        find: function (tag) {
            for (var i = 0; i < objs.length; i++) {
                if (objs[i].tag == tag) {
                    return objs[i];
                }
            }
            return null;
        },
        
        length: function () {
            return objects.length;
        },
        
        objects: function () {
            return objects;
        }
    }
}());
