let Game = Class.extend({
	init: function({fps,canvasId}){
		this.fps = fps || 60;
		this.canvasId = canvasId;
		this.canvas = document.querySelector('#' + canvasId);
		this.ctx = this.canvas.getContext('2d');
		this.timer = null;
		this.gameOver = false;
		this.pipeList = [];
		this.maxScore = this.getMaxScore();
		this.currentScore = 0;
		this.restTime = 3;
		this.pipeInteval = 200;

		// init image source
		let self = this;
		if(!this.images){
			let images = new sourceUtil();
			images.loadImages('r.json',function(currentNum,allNum,images){
				if(currentNum == allNum){
					self.images = images;
					self.run();
				}
			});
		}
		// add click Listener when click begin
		this.canvas.addEventListener('click',(e)=>{
			let clickPosition = this.getMousePos(e);
			if(this.gameOver){
				if(clickPosition.x> 802 && clickPosition.x < 980 && clickPosition.y > 640 && clickPosition.y < 666){
					this.init({fps:this.fps,canvasId:this.canvasId});
					this.run();
				}
			}
		});
		window.document.onkeydown = (event)=>{
			if(event.keyCode == 38 && !this.gameOver){
				this.bird.upStatFram = this.frames.currentFrame;
				this.bird.fly();
			}
		}
	},

	getMousePos:function(event) {
		var e = event || window.event;
		return {'x':e.screenX,'y':e.screenY}
	},

	getMaxScore: function(){
		return this.maxScore || 0;
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
		this.bird.update();
		this.bird.render();
		
		if(!(this.frames.currentFrame % this.pipeInteval)){
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
		if(this.gameOver){
			this.ctx.drawImage(this.images.gameover, 0, 0, 622, 144, this.canvas.width/2-311, this.canvas.height/2-72, 622, 144);
			this.ctx.drawImage(this.images.gamebegin, 0, 0, 337, 75,this.canvas.width - 350,this.canvas.height - 98 , 337, 75);
		}
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
		this.restRender();  // restTime render
		this.gameBeginTimer =	setInterval(()=>{
			this.restRender();
			this.ctx.drawImage(this.images.number,40 * this.restTime,0,40,57,this.canvas.width/2,this.canvas.height/2,40,57);
			this.restTime -- ;
			if(this.restTime < 0){
				clearInterval(this.gameBeginTimer);
				this.gameBeginTimer = null;
				this.gameOver = false;
				this.timer = setInterval(function(){
				_this.mainLoop();
			},1000/this.fps);
			}
		},1000);
	},

	restRender: function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.house.render();
		this.tree.render();
		this.floor.render();
		this.bird.render();
	},

	pause: function(){
		clearInterval(this.timer);
		this.timer = null;
	},

	gameover: function(){
		this.gameOver = true;
		clearInterval(this.timer);
		this.timer = null;
	}
});