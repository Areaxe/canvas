let Pipe = Class.extend({
  init: function () {
    let canvasHeight = game.canvas.height;
    this.x = game.canvas.width;
    this.imageDown = game.images.pipe0;
    this.imageUp = game.images.pipe1;
    this.width = 148;
    this.dHeight = parseInt(Math.random() * (canvasHeight / 3) + canvasHeight / 3);
    this.upHeight = canvasHeight - this.dHeight - 200;
    this.downY = canvasHeight - this.dHeight;
    this.speed = 2;
  },
  update: function () {
    this.x = this.x - this.speed;
    if (this.x + this.width <= 0) {
     game.pipeList = _.without(game.pipeList, this);
    }
    let bird = game.bird;
    if (bird.x + 66 > this.x && bird.x - this.x <= 138) {
      game.currentPipe = this;
      if(bird.x - this.x ==74){
        game.currentScore = game.currentScore + 1;
        if(game.currentScore > game.maxScore){
          game.maxScore = game.currentScore;
        } 
      }
      if(bird.y + bird.vt+4 >= this.downY){
        game.gameover();
      }

      if ( bird.y + bird.height >= this.downY || bird.y <= this.upHeight ) {
        game.gameOver;
        this.speed == 0;
        game.gameover();
        return;
      }
      
    }
  },
  pause: function(){
    this.speed = 0;
  },
  render: function () {
    let { imageUp, imageDown, width, dHeight, upHeight, downY, x } = this;
    //上面的管子
    game.ctx.drawImage(imageUp, 0, 1664 - upHeight, width, upHeight, x, 0, width, upHeight);
    //下面的管子
    game.ctx.drawImage(imageDown, 0, 0, width, dHeight, x, downY, width, dHeight);
  }
});