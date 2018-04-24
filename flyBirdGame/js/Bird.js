let Bird = Class.extend({
	init: function({image,y,width,height}){
		this.image = image;
		this.x = game.canvas.width/2;
		this.y = game.canvas.height/2;
		this.width = width;
		this.height = height;
		this.swing = 0;
		console.log(this)
	},
	update: function(){
		this.swing ++;
		if(this.swing == 3){
			this.swing = 0;
		}
	},
	render: function(){
		game.ctx.drawImage(this.image,this.swing*85,0,85,60,this.x,this.y,85,60);
	}
})