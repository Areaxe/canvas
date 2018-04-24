let Bird = Class.extend({
	init: function({image,x,y,width,height}){
		this.image = image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.swing = 0;
	},
	update: function(){
		this.swing ++;
		if(this.swing == 3){
			this.swing = 0;
		}
	},
	render: function(){
		Game.ctx.drawImage(this.image,0,0,85,0,game.width/2,game.canvas.height/2,this.x,this.y);
	}
})