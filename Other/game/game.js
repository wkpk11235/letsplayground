//region stuff
canvas=document.getElementById("canvas");
screen=canvas.getContext("2d");
jsia=document.getElementById("jsia");


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

bg=(0,0,0);

ch=canvas.height;
cw=canvas.width;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.addEventListener('touchstart',touch);
}
else {
  document.addEventListener('click',click);
}

maxTouchLimit=1;
function touch(event){
  ev=event;
  for (i=0;i<event.touches.length&&i<maxTouchLimit;++i){
    rawtouch(event.touches[i].clientX,event.touches[i].clientY);
  }
}
function click(event){
  rawtouch(event.x,event.y);
}
//endregion

coins=parseInt(localStorage['coins'])||0;
coinspit=parseInt(localStorage['upclick'])||1;
autoclick=parseInt(localStorage['autoclick'])||0;
autospeed=parseInt(localStorage['autospeed'])||1;

jsia.innerHTML=String(coins)+"원";

maxcoindisp=6;
function rawtouch(x,y){
  for (i=0;i<coinspit&&i<maxcoindisp;++i){
    new coin(x,y,Math.random()*3-1.5,Math.random()*5-2.5);
  }
  coins+=coinspit;
  jsia.innerHTML=String(coins)+"원";
}

function save(){
  setTimeout(function(){localStorage['coins']=coins;},1);
}
function reset(){
  localStorage['coins']=0;
  localStorage['upclick']=1;
  localStorage['autoclick']=0;
  localStorage['autospeed']=1;
  coinspit=1;
  autoclick=0;
  coins=0;
  jsia.innerHTML="0원";
}
function m(){
  coins-=coinspit;
}

autoclicker=0;

var b=Math.floor(1000/autospeed);

screen.fillStyle="black";
function main(){
  autoclicker++;
  screen.clearRect(0,0,cw,ch);
  if (autoclicker==b){
    autoclicker=0;
    coins+=autoclick;
    jsia.innerHTML=String(coins)+"원";
  }
  updateAll();
  save();
}


setInterval(main,1);
