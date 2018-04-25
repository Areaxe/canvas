let Pipe = Class.extend({
	init: function(){
		this.state = Math.round(Math.random());  
		this.x = game.canvas.width;
		this.maxH = game.canvas.height / 2 - 60;
		this.image = game.images.pipe0;
		this.width = 148;
		this.y = Math.random() * 1664;
		this.height = 1664;
	},
	update: function(){
		this.x --;
		if(this.x + this.width <= 0){
			_.without(game.pipeList,this);
		}
	},
	render: function(){
		let pipeH = this.height - this.y;
		console.log(pipeH)
		console.log(this.width)
		console.log(pipeH)
		console.log(pipeH)
		game.ctx.drawImage(this.image, 0,pipeH, this.width,this.height,this.x,0,this.x,this.y);
		
		// let h,currentX;
		// for(let i=0; i < pipeList.length; i++){
		// 	h = Math.random() * this.maxH;
		// 	currentX = this.x + i*(148 + this.space);
		// 	game.ctx.drawImage(this.image,0,)
		// 	// game.ctx.drawImage(this.x;);
		// }
	}

});

// render pipeList
// add pipe when 