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
        },

        moveTowards: function (object, to) {
            this.rotation = Math.atan2(object.y - to.y, object.x - to.x);
            object.x -= Math.cos(this.rotation) * object.speed;
            object.y -= Math.sin(this.rotation) * object.speed;
        }
    }
}());
