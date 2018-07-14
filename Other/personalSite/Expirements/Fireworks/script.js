canvas=document.getElementById('canvas');
screen=canvas.getContext('2d');

explosion_power=50;
gravconst=0.05;
alloted_space=50;
fadespeed=0.7;

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

scrwidth=canvas.width;
scrheight=canvas.height;


sound=new Audio('explosion.wav');

presses=[];
fireworks=[];

speed=1;
firework_speed=5;

class powder {
  constructor(x,y,dx=0,dy=0,radius=2,light=5,func=null) {
    this.x=x;
    this.y=y;
    this.dx=dx*speed;
    this.dy=dy*speed;
    this.light=light;
    this.r=Math.floor(Math.random()*256);
    this.g=Math.floor(Math.random()*256);
    this.b=Math.floor(Math.random()*256);
    this.alpha=255;
    this.radius=radius;
    this.temp=[];
    if (func==null){
      this.haveFunc=false;
    }
    else {
      this.haveFunc=true;
      this.func=func;
      this.extravars={};
    }
    fireworks.push(this);
  }
  destroy(){
    fireworks.splice(fireworks.indexOf(this),1);
  }
  sim(){
    this.dy-=gravconst/this.light;
    this.y-=this.dy;
    this.x+=this.dx;
    this.temp=[
      (this.r*this.alpha/255),
      (this.g*this.alpha/255),
      (this.b*this.alpha/255)
    ];
    screen.beginPath();
    screen.fillStyle='rgb('+ this.temp.join(',') +')';
    screen.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    screen.fill();
    this.alpha-=fadespeed;
    if (this.haveFunc) {
      this.func(this);
    }
    if (this.x>scrwidth+alloted_space || this.x<-alloted_space || this.y>scrheight+alloted_space || this.y<-alloted_space || this.alpha<=0) {
        fireworks.splice(fireworks.indexOf(this),1);
    }
  }
}

function boom1(dis){
  for (i=0;i<explosion_power;++i){
    new powder(dis.x,dis.y,Math.random()*4-1.5,Math.random()*4-1.5)
  }
  sound.cloneNode(true).play();
  dis.destroy();
}

function boom2(dis){
  a=dis.extravars["timer"]||0;
  a+=1;
  if (a==3){
    new powder(dis.x,dis.y);
    a=0;
  }
  dis.extravars['timer']=a;
}

function boom1_but_wait(dis){
  a=dis.extravars['timer'] || 0;
  a+=1;
  if (a==200){
    for (i=0;i<explosion_power;++i){
      new powder(dis.x,dis.y,Math.random()*4-1.5,Math.random()*4-1.5);
    }
    dis.destroy();
    sound.cloneNode(true).play();
  }
  dis.extravars['timer']=a;
}

function boom3(dis){
  for (i=0;i<2;++i){
    new powder(dis.x,dis.y,-0.5+i,2,5,5,boom1_but_wait);
  }
  dis.destroy();
  sound.play();
}

explosions=[boom1,boom2,boom3];

firework_radius=5;

class firework {
  constructor(x,y,func=null) {
    this.x=Math.floor(Math.random()*(scrwidth+1));
    this.y=scrheight;
    this.dest_x=x;
    this.dest_y=y;
    this.color=[Math.floor(Math.random()*256),
      Math.floor(Math.random()*256),
      Math.floor(Math.random()*256),
    ];
    this.colorstring='rgb('+ this.color.join(',') +')';
    this.angle=Math.atan2(this.dest_y-this.y,this.dest_x-this.x);
    this.dx=Math.cos(this.angle)*firework_speed;
    this.dy=Math.sin(this.angle)*firework_speed;
    this.extravars={};
    if (func==null){
      this.func=explosions[Math.floor(Math.random() * explosions.length)];
    }
    else{
      this.func=func;
    }
    fireworks.push(this);
  }
  destroy(){
    fireworks.splice(fireworks.indexOf(this),1);
  }
  sim(){
    this.x+=this.dx;
    this.y+=this.dy;
    if (this.y-this.dest_y<=0){
      this.func(this);
    }
    if (this.x>scrwidth+alloted_space || this.x<-alloted_space || this.y>scrheight+alloted_space || this.y<-alloted_space) {
      fireworks.splice(fireworks.indexOf(this),1);
    }
    else{
      screen.beginPath();
      screen.fillStyle=this.colorstring;
      screen.arc(this.x, this.y, firework_radius, 0, 2 * Math.PI, false);
      screen.fill();
    }
  }
}

function handle_all(){
  for (i=0;i<fireworks.length;++i){
    fireworks[i].sim();
  }
}


function onClick(event){
  new firework(event.clientX,event.clientY)
}

document.addEventListener('click', onClick)

function Update(){
  screen.clearRect(0,0,scrwidth,scrheight);
  handle_all();
}

setInterval(Update,5);
