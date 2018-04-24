let Game = Class.extend({
	init: function({fps,canvasId}){
		this.fps = fps || 60;
		this.canvas = document.querySelector('#' + canvasId);
		this.ctx = this.canvas.getContext('2d');
		this.timer = null;
		this.gameState = 'on';
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
		this.bird.update();
		this.bird.render();
	},

	run: function(){
		let _this = this;
		let canvasHeight = this.canvas.height;
		let floorY = canvasHeight - 48;
		let treeY = canvasHeight - 264;
		let hourseY = canvasHeight - 360;
		this.canvas.addEventListener('mousedown',function(event){
			console.log(event)
		});
		window.document.onkeydown = function(){
			if(this.timer){

			}
		}
		this.timer = setInterval(function(){
			_this.mainLoop();
		},1000/this.fps);
		this.frames = new FramesUtil();
		this.house = new Background({image: this.images.house, width: 300,	height: 256, y: hourseY,speed:3 });
		this.tree = new Background({image: this.images.tree, width: 300,	height: 216, y: treeY,speed:2 });
		this.floor = new Background({image: this.images.floor, width: 48,	height: 48, y: floorY,speed:1 });
		this.bird = new Bird({image: this.images.bird,width: 255,height:60})
	},

	pause: function(){
		clearInterval(this.timer);
		this.timer = null;
	},

	gameover: function(){
		clearInterval(this.timer);
		this.timer = null;
	}
});