/**
 * @Physics.js 
 * @author Ali Kutluozen
 *
 * Provides basic physics functions
 */

var Physics = (function () {

    'use strict';
    
    return {
        // Box collision check
        boxCollision: function (thisEntity, otherEntity) {
            if (thisEntity.x < otherEntity.x + otherEntity.width &&
                thisEntity.x + thisEntity.width > otherEntity.x &&
                thisEntity.y < otherEntity.y + otherEntity.height &&
                thisEntity.y + thisEntity.height > otherEntity.y)
                return true;
            else return false;
        }
    }
}());
