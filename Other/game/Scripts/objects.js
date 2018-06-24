img=document.getElementById("coin");

grav=0.05;


class coin extends gifobj{
  constructor(x,y,dx=0,dy=0,startFrame=0) {
    super(img,10,6,x,y,15,15,startFrame);
    this.dy=dy;
    this.dx=dx;
    objs.push(this);
  }
  update(){
    super.draw();
    super.processFrame();
    this.y+=this.dy;
    this.x+=this.dx;
    this.dy+=grav;
    if (this.y>ch){
      objs.splice(objs.indexOf(this),1);
    }
  }
}
function updateAll(){
  for (i=0;i<objs.length;++i){
    objs[i].update();
  }
}
