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
    this.ndy = 0;
  },

  update: function () {
    let currentFrame = game.frames.currentFrame;
    this.vt = 0.1* 9.8 * Math.sqrt((currentFrame - this.dropStatFram)/game.fps,2);
    if(!(currentFrame % 4)){
      this.swing++;
      if (this.swing == 3) {
        this.swing = 0;
      }
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
      // this.vt = 0.5* 9.8 * Math.sqrt((currentFrame - this.dropStatFram)/game.fps,2);
      // console.log(vt)
      this.dy += this.vt;
      // this.dy += 1;
    }
    this.y = this.y + this.dy;
  },

  fly: function(){
    this.state = 1;
  },

  drop: function(){
    this.dy = this.dy + 0.5 * 9.8 * Math.sqrt(currentFrame - this.dropStatFram,2) / game.fps /1000;
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