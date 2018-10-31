var question = document.getElementById("question");
var choices  = document.getElementById("choices").children;

var rightIndex = 0;
var winF = null;
var loseF = null;

function set(qName, choices, index, f = null, win = null, lose = null){
  this.name = qName;
  this.choices = choices;
  this.index = index;
  this.f = f;
  this.win = win;
  this.lose = lose;
}

set.prototype.start = function(){
  winF = this.win;
  loseF = this.lose;
  question.innerHTML = this.name;
  for (var i=0; i<4; ++i){
    choices[i].innerHTML = this.choices[i];
  }
  rightIndex = this.index;
  if (this.f != null){
    this.f();
  }
}

function stuff(stuffz){
  var stuffs = stuffz;
  stuffs[0].start();

  var stuffIndex = 0;

  for (var i=0; i<4; ++i){
    let j = i;
    choices[i].onclick = function(){
      if (j == rightIndex) {
        stuffIndex++;
        if (winF != null){
          winF();
        }
        alert("맞았네");
        if (stuffIndex == stuffs.length){
          window.location.href = './youwin.html'
        }
        else {
          stuffs[stuffIndex].start();
        }
      }
      else {
        alert("틀렸어");
        if (loseF != null){
          loseF();
          setTimeout(function(){
            window.location.reload();
          }, 1000);
        }
        else {
          window.location.reload();
        }
      }
    }
  }
}


function playSound(src){new Audio(src).play();}
function randomImage(src){
  let image = document.createElement("img");
  image.src = src;

  image.style.position = "absolute";
  image.style.zIndex = "-1";

  setInterval(function(){
    var x = Math.floor(Math.random() * (window.innerWidth - 300));
    var y = Math.floor(Math.random() * (window.innerHeight - 300));

    image.style.top = String(y)+"px";
    image.style.left = String(x)+"px";
  },40);

  document.body.appendChild(image);

  return image;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  while (true) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
