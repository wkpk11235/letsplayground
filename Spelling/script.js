var key = localStorage["PASSWORD"];
div = document.getElementById("ans");
number = document.getElementById("number");
def = document.getElementById("definition");

parser = new DOMParser();pointer = 0;
var word = data[pointer];
checking = null;
arrrrrr = null;

var lnk;

function collectDef() {
  def.innerHTML = "";
  let n = 0;
  for (let i=0;i<arrrrrr.length;++i) {
    let arrrrr = arrrrrr[i].shortdef;
    for (let j=0;j<arrrrr.length;++j) {
      if (arrrrr[j].toLowerCase().includes(word)) {continue;}
      n += 1;
      def.innerHTML += String(n) + ". ";
      def.innerHTML += arrrrr[j] + "<br/>";
    }
  }
}

function say(w, check) {
  let xmlhttp = new XMLHttpRequest();
  let url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+w+"?key="+key;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      arrrrrr = JSON.parse(this.responseText);
      if (check && arrrrrr[0].meta.id.split(":")[0] != w) {
        word = arrrrrr[0].meta.id.split(":")[0];
        say(word, false);
      }
      else {
        let j = 0;
        let hasSound = false;
        let prns;
        collectDef();
        while (!hasSound) {
          if (arrrrrr[0].hwi.prs[j].sound !== undefined) {
            prns = arrrrrr[0].hwi.prs[j].sound.audio;
            hasSound = true;
          }
          ++j;
        }
        lnk = "https://media.merriam-webster.com/soundc11/";
        if (prns.startsWith("bix")) {
          lnk += "bix/";
        }
        else if (prns.startsWith("gg")) {
          lnk += "gg/";
        }
        else if (!isNaN(parseInt(prns.charAt(0)))){
          lnk += "number/";
        }
        else {
          lnk += prns.charAt(0)+"/";
        }
        lnk += prns+".wav";
        play();
      }
    };
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function play() {
  let aud = document.createElement("audio");
  aud.src = lnk;
  aud.volume = 0.3;
  aud.play();
}

function later() {
  clearInterval(checking)
  check();
  checking = setInterval(check,1);
}

function start() {
  later();
  say(word, true);
}

function idk() {
  clearInterval(checking);
  div.innerHTML = word;
  setTimeout(later,1500);
}

function check() {
  if (div.innerHTML == word) {
    ++pointer;
    doWord();
  }
  var wordn = Number(number.innerHTML.split("/")[0]);
  if (pointer != wordn - 1) {
    pointer = wordn - 1;
    word = data[pointer];
  }
}

function doWord() {
  word = data[pointer];
  say(word, true);
  div.innerHTML = "";
  number.innerHTML = String(pointer+1)+"/"+String(data.length);
}