function setFontSize(text,size) {
  tempClassList=document.getElementsByClassName(text);
  for (i=0; i<tempClassList.length; ++i){
    tempClassList[i].style.fontSize=size;
  }
}

function setFontFont(text,fontName){
  tempClassList=document.getElementsByClassName(text);
  for (i=0; i<tempClassList.length; ++i){
    tempClassList[i].style.fontFamily=fontName;
  }
}

function setFontData(text,fontData){
  tempClassList=document.getElementsByClassName(text);
  for (i=0; i<tempClassList.length; ++i){
    tempClassList[i].style.font=fontData;
  }
}
