jsia=document.getElementById("jsia");
coins=localStorage['coins']||0;
upclick=parseInt(localStorage['upclick'])||1;
autoclick=parseInt(localStorage['autoclick'])||0;
autospeed=parseInt(localStorage['autospeed'])||1;

settext();


function settext(){
  upclickPrice=Math.floor(Math.pow(Math.sqrt(upclick),3)*10);
  autoclickPrice=Math.floor(autoclick*autoclick/25*Math.sqrt(autospeed*8));
  autospeedPrice=Math.floor(Math.pow(autoclickPrice,4/5)*Math.cbrt(autospeed*2));
  jsia.innerHTML="코인 수: "+String(coins)+
  "<br><br>돈 공장: "+String(autoclick)+" ("+String(autoclickPrice)+" 원)"+
  "<br>돈 공장 속도: "+String(autospeed)+" ("+String(autospeedPrice)+" 원)"+
  "<br>클릭당 얻는 돈: "+String(upclick)+" ("+String(upclickPrice)+" 원)";
  localStorage['coins']=coins;
  localStorage['upclick']=upclick;
  localStorage['autoclick']=autoclick;
  localStorage['autospeed']=autospeed;
}

function buy(stuff){
  switch (stuff) {
    case "upclick":
      if (upclickPrice<=coins){
        coins-=upclickPrice;
        upclick++;
        settext();
      }
      else {
        alert("돈이 부족합니다.")
      }
      break;
    case "autoclick":
      if (autoclickPrice<=coins){
        coins-=autoclickPrice;
        autoclick++;
        settext();
      }
      else {
        alert("돈이 부족합니다.")
      }
      break;
    case "autospeed":
      if (autospeedPrice<=coins){
        coins-=autospeedPrice;
        autospeed++;
        settext();
      }
      else {
        alert("돈이 부족합니다.");
      }
      break;
  }
}
