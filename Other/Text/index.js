function select(n) {
    pushMessage("right", buttons[n].innerHTML);
    setTimeout(function(){addMessage(dialogue.select(n));},500);
}

function addMessage(arr) { // arr represents text, choice1~3
    pushMessage("left", arr[0]);
    if (arr.length == 1) {
        setTimeout(function(){pushMessage("middle", "--ENDING--");},1000);
    }
    else {
        buttons[0].innerHTML = arr[1];
        buttons[1].innerHTML = arr[2];
        buttons[2].innerHTML = arr[3];
    }
}

function pushMessage(side, text) {
    let li = document.createElement("li");
    li.classList.add(side);
    li.classList.add("message");
    li.innerHTML = text;
    chatlist.appendChild(li); // use of javascript's mad syntax
    chat.scrollTop = chat.scrollHeight;
}

window.onload = function() {
    chat = document.getElementById("chat");
    chatlist = document.getElementById("chatlist");
    buttons = document.getElementsByClassName("button-select");
    
    dialogue = new Dialogue();
    addMessage(dialogue.init());
};