var curpagepp = 1;
var sections = [];

Array.prototype.forEach.call(document.getElementsByTagName("div"),function(item){
    if (item.id.startsWith("section")){
        sections.push(item);
    }
});

function setDisplay(){
    sections.forEach(function(item){
        if (Number(item.id.substring(8))==curpagepp){
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    })
    if (curpagepp == sections.length){
        document.getElementById("button").style.display = "none";
    }
}

setDisplay();

function next(){
    window.location = "#section-"+String(++curpagepp);
    setDisplay();
}