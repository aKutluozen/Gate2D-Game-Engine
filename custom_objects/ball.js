function Ball(x, y, width, height, tag) {
    Entity.apply(this, arguments);
    this.img = Loader.getFile('imgBall');
    this.speed = 1;
}

Ball.prototype = objBall = new Entity();

objBall.draw = function (context) {
    context.drawImage(this.img, this.x, this.y);
}

objBall.update = function () {
    Physics.moveTowards(this, Objects.point);
}