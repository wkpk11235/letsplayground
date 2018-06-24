objs=[];

grav=5;

class gifobj {
  constructor(sheet,frameSpeed,numimgs,x,y,width=null,height=null,startFrame=0) {
    this.frame=0;
    this.rFc=0;
    this.frameSpeed=frameSpeed;
    this.img=sheet;
    this.swidth=sheet.width/numimgs;
    this.sheight=sheet.height;
    this.sx=this.swidth*(startFrame+1);
    this.limit=sheet.width-this.swidth;
    if (width==null){
      this.width=this.swidth;
    }
    else {
      this.width=width;
    }
    if (height==null){
      this.height=this.sheight;
    }
    else {
      this.height=height;
    }
    this.x=x;
    this.y=y;
  }
  draw(){
    screen.drawImage(this.img,
      this.sx,
      0,
      this.swidth,
      this.sheight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  processFrame(){
    this.rFc++;
    if (this.rFc==this.frameSpeed){
      this.rFc=0;
      if (this.sx==this.limit){
        this.sx=this.swidth;
      }
      else {
        this.sx+=this.swidth;
      }
    }
  }
}
