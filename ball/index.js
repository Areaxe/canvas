let canvas = null;
let ballList = [];
let cxt;
window.onload = function () {
  canvas = document.querySelector('#canvas');
  let clientW = window.innerWidth;
  let clientH = window.innerHeight;
  canvas.width = clientW; 
  canvas.height = clientH;
  cxt = canvas.getContext('2d');
  canvas.addEventListener('mousemove', (event) => {
    new Ball(event.clientX, event.clientY);
  });
  canvas.addEventListener('touchmove', (event) => {
    let touch = event.changedTouches[0];
    new Ball(touch.clientX, touch.clientY);
  });

  setInterval(()=>{
    cxt.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<ballList.length;i++){
      ballList[i].update();
      if(ballList[i])
        ballList[i].render();
    }
  },20);
}

let Ball = function (x, y) {
  this.x = x;
  this.y = y;
  this.r = Math.random() * 50;
  this.dx = Math.random() * 10 - 5;
  this.dy = Math.random() * 10 - 5;
  this.dr = Math.random() + 0.3;
  this.color = getColor();
  ballList.push(this);
}

Ball.prototype = {
  update: function () {
  this.x += this.dx;
  this.y += this.dy;
  this.r -= this.dr;
  if(this.r <=0){
    ballList = _.without(ballList,this);
  }
  },
  render: function () {
    cxt.beginPath();
    cxt.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    cxt.fillStyle = this.color;
    cxt.fill();
    cxt.closePath();
  }
}

function getColor(){
  var colorValue="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
  var colorArray = colorValue.split(",");
   var color="#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
   for(var i=0;i<6;i++){
      color+=colorArray[Math.floor(Math.random()*16)];
   }
   return color;
}