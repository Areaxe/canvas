let sourceUtil = Class.extend({
	init: function(){
		this.images = {};
	},
	loadImages: function(url,callBack){
		this.url = url;
		let self = this;
		let xmlhttp;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				let alreayLoadNumber = 0;
				let dataJson = JSON.parse(xmlhttp.responseText);
				let images = dataJson.images;
				let image = null;
				for(let i=0,len=images.length;i<len;i++){
					image = new Image();
					image.index = i;
					image.src = images[i].url;
					image.onload = function(){
						alreayLoadNumber++;
						self.images[images[i].name] = this;
						callBack(alreayLoadNumber,images.length,self.images);
					}
				}
			}
		}
		xmlhttp.open('get',this.url,true);
		xmlhttp.send();
	}
})