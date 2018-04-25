let Pipe = Class.extend({
	init: function(){
		let canvasHeight = game.canvas.height;
		this.state = Math.round(Math.random());  
		this.x = game.canvas.width;
		this.imageDown = game.images.pipe0;
		this.imageUp = game.images.pipe1;
		this.width = 148;
		this.dHeight = Math.random() * (canvasHeight / 3) + canvasHeight/3;
		this.upHeight = canvasHeight - this.dHeight - 180
		this.downY = canvasHeight-this.dHeight;
	},
	update: function(){
		this.x --;
		if(this.x + this.width <= 0){
			_.without(game.pipeList,this);
		}
	},
	render: function(){
		let {imageUp,imageDown,width,dHeight,upHeight,downY,x} = this;
		//上面的管子
		game.ctx.drawImage(imageUp,0,1664-upHeight, width,upHeight,x,0,width,upHeight);
		//下面的管子
		game.ctx.drawImage(imageDown, 0,0, width,dHeight,x,downY,width,dHeight);
	}
});