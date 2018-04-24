let Bird = Class.extend({
  init: function ({image, y, width, height}) {
    this.image = image;
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height / 2;
    this.width = width;
    this.height = height;
    this.swing = 0;
    this.dy = 0;
    this.dropStatFram = game.frames.currentFrame;
    this.nowTime = 0;
  },
  update: function () {
    this.swing++;
    if (this.swing == 3) {
      this.swing = 0;
    }
    // this.dy = 1/2*9.8*Math.sqrt(t,2);
    // this.y = this.y + 0.5 * 9.8 * (Math.pow(game.frames.currentFrame,2)- Math.pow(this.dropStatFram, 2));
  
    if(this.y>= game.canvas.height){
      game.gameover();
    }
  },
  render: function () {
    game.ctx.save();
    game.ctx.translate((this.x+this.width) / 2,(this.y+this.height) / 2);
    game.ctx.rotate(Math.PI/180*2);
    game.ctx.translate(-(this.x+this.width) / 2,-(this.y+this.height) / 2);//将画布原点移动
    game.ctx.drawImage(this.image, this.swing * 85, 0, 85, 60, this.x, this.y, 85, 60);
    game.ctx.restore();
  }
});