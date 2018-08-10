var dy=0;
var pw=50;
var ph=50;
var px=50;
var py=0;

var objs=[];

function makeNew(){
  var rand=random(50,200);
  var rand2=random(50,300);
  new groundE(rand,rand2);
  new skyE(rand,height-rand2-330);
}

function setup(){
  createCanvas(800,800);
  mic=new p5.AudioIn();
  mic.start();
  textSize(50);
}
function draw() {
  background(0);
  handlePlayer();
  handleEnemies();
  fill(0,255,0);
  noStroke();
  rect(0,775,width,height);

  text("time: "+floor(millis()/1000),50,50);
}

class groundE {
  constructor(w,h) {
    this.x=width;
    this.width=w;
    this.height=h;
    this.y=775-this.height;
    objs.push(this);
  }
  draw(){
    this.x-=5;
    fill(255,0,0);
    rect(this.x,this.y,this.width,this.height);
  }
}
class skyE {
  constructor(w,h) {
    this.x=width;
    this.width=w;
    this.height=h;
    this.y=0;
    objs.push(this);
  }
  draw(){
    this.x-=5;
    fill(255,0,0);
    rect(this.x,this.y,this.width,this.height);
  }
}


function handleEnemies(){
  for(i=0,max=objs.length;i<max;++i){
    var co=objs[i];
    co.draw();
    if (collideRectRect(co.x,co.y,co.width,co.height,px,py,pw,ph)){
      window.location.reload();
    }
    else if (co.x<-co.width){
      objs.splice(i,1);
      max--;
      i--;
    }
  }
}

function handlePlayer(){
  var volume=mic.getLevel();
  dy+=-volume*5000;
  dy/=2;
  stroke(255);
  strokeWeight(4);
  fill(255);
  py=725+dy;
  rect(px,py,pw,ph);
}

setInterval(makeNew,1500);
