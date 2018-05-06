function logMouseMove(event) {
  x=event.clientX
  y=event.clientY
  create_circle()
}

function onTouch(event){
  x=event.touches[0].pageX
  y=event.touches[0].pageY
  create_circle()
}

document.addEventListener('touchstart', onTouch)
document.addEventListener('click', logMouseMove)

canvas=document.getElementById('canvas')
screen=canvas.getContext("2d")
canvas.width=window.innerWidth
canvas.height=window.innerHeight

x=canvas.width+1
y=canvas.height+1

width=10

screen.fillStyle="white"

circles=[]

function circle(xpos,ypos,rad,dx=0,dy=0) {
  this.x=xpos
  this.y=ypos
  this.radius=rad
  this.dy=0
  this.dx=0
  this.draw=draw
  this.simulate=simulate
  circles.push(this);
}

bounce_power=0.5

function draw(){
  screen.beginPath()
  screen.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
  screen.fill()
}
function simulate(){
  if (this.y<canvas.height-50){
    this.dy+=0.05
  } else {
    this.y=canvas.height-50
    this.dy=-this.dy*bounce_power
    this.radius=this.radius*bounce_power
  }
  this.x+=this.dx
  this.y+=this.dy
}

certified_radius=0.1

function simall(){
  for (i=0;i<circles.length;++i){
    circles[i].draw()
    circles[i].simulate()
  }
}


function simulation(){
  screen.clearRect(0,0,canvas.width,canvas.height)
  simall()

}

function create_circle(){
  new circle(x,y,4)
}

setInterval(simulation,1)
