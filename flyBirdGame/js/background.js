let Background = Class.extend({
	init: function({image,y,width,height,speed}){
		this.image = image;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.y = y;
		this.x = 0;
		this.amount = Math.ceil(game.canvas.width / this.width );
	},
	update: function(){
		this.x = this.x - this.speed;
		game.ctx.fillText(this.x,20,20);
		if((this.x + this.width*this.amount) <=0){
			this.x = 0;
		}
	},
	render: function(){
		let {image,height,width,y,x} = this;
		for(let i=0,len=this.amount*2;i<len;i++){
			game.ctx.drawImage(image,0,0,width,height,this.x + width * i,this.y,width,height);
		}
	}
})