let canvas = null;
let ballList = [];
let cxt;
window.onload = function () {
  canvas = document.querySelector('#canvas');
  canvas.width = '600';
  canvas.height = '400';
  cxt = canvas.getContext('2d');
  // canvas.addEventListener('mousemove', (event) => {
  //   new Ball(event.clientX, event.clientY);
  // });
  canvas.addEventListener('touchmove', (event) => {
    let touch = event.changedTouches[0];
    new Ball(touch.clientX, touch.clientY);
  });
  for(let i=0;i<5;i++){
    new Ball(100,100);
  }
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
  this.r = 30;
  this.dx = Math.random() * 10 - 5;
  this.dy = Math.random() * 10 - 5;
  this.dr = Math.random() + 0.3;
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
    cxt.fillStyle = 'blue';
    cxt.fill();
    cxt.closePath();
  }
}