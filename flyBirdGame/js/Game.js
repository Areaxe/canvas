let Game = Class.extend({
	init: function({fps,canvasId}){
		this.fps = fps || 60;
		this.canvas = document.querySelector('#' + canvasId);
		this.ctx = this.canvas.getContext('2d');
		this.timer = null;
		this.gameState = 'on';
		this.pipeList = [];
		this.maxScore = 0;
		this.currentScore = 0;
		let self = this;
		
		let images = new sourceUtil();
		images.loadImages('r.json',function(currentNum,allNum,images){
			if(currentNum == allNum){
				self.images = images;
				self.run();
			}
		});
	},

	mainLoop: function(){
		this.frames.update();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.house.update();
		this.house.render();
		this.tree.update();
		this.tree.render();
		this.floor.update();
    this.floor.render();
    if(this.gameState !== 'over'){
      this.bird.update();
		  this.bird.render();
    }else{
      this.bird.drop();
    }
		
		if(!(this.frames.currentFrame % 200)){
			this.pipeList.push(new Pipe());
		}
		for(let i=0;i<this.pipeList.length;i++){
			this.pipeList[i].update();
			if(this.pipeList[i]){
				this.pipeList[i].render();
			}
		}
		this.ctx.fillText ('当前得分：' + this.currentScore,940,20);
		this.ctx.fillText ('最高分数: ' + this.maxScore,940,40);
	},

	run: function(){
		let _this = this;
		let canvasHeight = this.canvas.height;
		let floorY = canvasHeight - 48;
		let treeY = canvasHeight - 264;
		let hourseY = canvasHeight - 360;

		this.frames = new FramesUtil();
		this.house = new Background({image: this.images.house, width: 300,	height: 256, y: hourseY,speed:3 });
		this.tree = new Background({image: this.images.tree, width: 300,	height: 216, y: treeY,speed:2 });
		this.floor = new Background({image: this.images.floor, width: 48,	height: 48, y: floorY,speed:1 });
		this.bird = new Bird({image: this.images.bird,width: 255,height:60});
		this.pipeList.push(new Pipe());
		
		this.timer = setInterval(function(){
			_this.mainLoop();
		},1000/this.fps);

		
		window.document.onkeydown = function(event){
			if(event.keyCode == 38){
				_this.bird.upStatFram = _this.frames.currentFrame;
				_this.bird.fly();
			}
    	}
	},

	pause: function(){
		clearInterval(this.timer);
		this.timer = null;
	},

	gameover: function(){
		if(this.currentScore > this.maxScore){
			this.maxScore = this.currentScore;
		}
		clearInterval(this.timer);
		this.timer = null;
		
	}
});