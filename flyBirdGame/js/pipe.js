let Pipe = Class.extend({
  init: function () {
    let canvasHeight = game.canvas.height;
    this.x = game.canvas.width;
    this.imageDown = game.images.pipe0;
    this.imageUp = game.images.pipe1;
    this.width = 148;
    this.dHeight = Math.random() * (canvasHeight / 3) + canvasHeight / 3;
    this.upHeight = canvasHeight - this.dHeight - 200;
    this.downY = canvasHeight - this.dHeight;
  },
  update: function () {
    this.x--;
    if (this.x + this.width <= 0) {
      _.without(game.pipeList, this);
    }
    let bird = game.bird;
    if (bird.x + 80 > this.x && bird.x - this.x <= 148) {
      if (bird.y <= this.upHeight || bird.y >= this.downY) {
        bird.drop();
        game.gameState = 'over';
        game.gameover();
      }
    }
  },
  render: function () {
    let { imageUp, imageDown, width, dHeight, upHeight, downY, x } = this;
    //上面的管子
    game.ctx.drawImage(imageUp, 0, 1664 - upHeight, width, upHeight, x, 0, width, upHeight);
    //下面的管子
    game.ctx.drawImage(imageDown, 0, 0, width, dHeight, x, downY, width, dHeight);
  }
});