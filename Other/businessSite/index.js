function ord(str){
  return str.charCodeAt(0);
}

function chr(int){
  return String.fromCharCode(int);
}

function caesarshift(stringcode,shiftint){
  final_string="";
  for (i=0;i<stringcode.length;++i){
    final_string+=chr(ord(stringcode.charAt(i))+shiftint);
  }
  return final_string;
}



function main() {
  a=document.getElementById("d");
  orig_cont=a.textContent;

  some_number=50;
    function dCoderContent(some_num){
      end_textcont=caesarshift(a.textContent,some_num);
      a.textContent=end_textcont;
      return end_textcont;
    }

  dCoderContent(some_number);
  spawntimer=0;
  modulator=1;
  function dCoding(){
    if (spawntimer%modulator==0){
      temp=dCoderContent(-1);
      if (orig_cont==a.textContent){
        clearInterval(dCodingExecution);
      }
      modulator+=1;
      spawntimer=modulator+1;
    }
    spawntimer+=1;
  }

  dCodingExecution=setInterval(dCoding,1);
}

window.onload=main;
