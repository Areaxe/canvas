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
		this.countdown = 3;
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
		this.canvas.onclick = (e = event ) => {
			var x = e.clientX - canvas.offsetLeft;
    	var y = e.clientY - canvas.offsetTop;
			if(this.gameOver){
				if(x> 772 && x < 960 && y > 520 && y < 560){
					this.init({fps:this.fps,canvasId:this.canvasId});
					this.run();
				}
			}
		};

		// add key event 
		window.document.onkeydown = (event)=>{
			if(event.keyCode == 38 && !this.gameOver){
				this.bird.upStatFram = this.frames.currentFrame;
				this.bird.fly();
			}
			if(event.keyCode == 32 && !this.gameOver){
				this.togglePause();
			}
		}
	},

	// save maxScore and return maxScore
	getMaxScore: function(){
		return this.maxScore || 0;
	},

	// update canvas when game run
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
			this.ctx.drawImage(this.images.gamebegin, 0, 0, 337, 75,this.canvas.width - 300,this.canvas.height - 100 , 337, 75);
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
		this.updateCountdown();  // countdown render
		this.gameBeginTimer =	setInterval(()=>{
			this.countdown -- ;
			this.updateCountdown();
			if(this.countdown < 0){
				clearInterval(this.gameBeginTimer);
				this.gameBeginTimer = null;
				this.gameOver = false;
				this.timer = setInterval(function(){  //Time to start the game 
					_this.mainLoop();
				},1000/this.fps);
			}
		},1000);
	},

// Update countdown
	updateCountdown: function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.house.render();
		this.tree.render();
		this.floor.render();
		this.bird.render();
		this.ctx.drawImage(this.images.number,40 * this.countdown,0,40,57,this.canvas.width/2,this.canvas.height/2,40,57);
	},

	togglePause: function(){
		if(this.timer){
			clearInterval(this.timer);
			this.timer = null;
		}else{
			this.timer = setInterval(()=>{  //Time to start the game 
					this.mainLoop();
				},1000/this.fps)
		}
	},

	gameover: function(){
		this.gameOver = true;
		clearInterval(this.timer);
		this.timer = null;
	}
});