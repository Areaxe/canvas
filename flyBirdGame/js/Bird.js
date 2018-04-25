let Bird = Class.extend({
  init: function ({image, y, width, height}) {
    this.image = image;
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height / 2;
    this.width = width;
    this.height = height;
    this.swing = 0;
    this.dy = 0;
    this.deltY = 0;
    this.dropStatFram = game.frames.currentFrame;
    this.nowTime = 0;
    this.state = 0;   // 0 drop,1 fly up
  },

  update: function () {
    this.swing++;
    let currentFrame = game.frames.currentFrame;
    if (this.swing == 3) {
      this.swing = 0;
    }
    if(this.state == 1){
      this.deltY ++;
      this.dy = -14 + this.deltY;
      if(this.dy >= 0){
        this.state = 0;
        this.deltY = 0;
        this.dropStatFram = currentFrame;
      }
    }
    else{
      this.dy = 0.01 * 9.8 * Math.pow(currentFrame - this.dropStatFram,2);
    }
    this.y = this.y + this.dy;
    
    if(this.y>= game.canvas.height){
      game.gameover();
    }
  },

  fly: function(){
    this.state = 1;
  },

  render: function () {
    // game.ctx.save();
    // game.ctx.translate((this.x+this.width) / 2,(this.y+this.height) / 2);
    // game.ctx.rotate(Math.PI/180*2);
    // game.ctx.translate(-(this.x+this.width) / 2,-(this.y+this.height) / 2);//将画布原点移动
    game.ctx.drawImage(this.image, this.swing * 85, 0, 85, 60, this.x, this.y, 85, 60);
    // game.ctx.restore();
  }
});