// outside code
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
}
// outside code

var entries = document.getElementsByClassName("color");

for (var i=0; i<entries.length; ++i) {
  let entry = entries.item(i);
  let color = entry.getElementsByClassName("key").item(0);
  color.style.backgroundColor = color.innerText;
  color.style.color = invertColor(color.innerText);
}

var palettes = document.getElementsByClassName("palette");

function toggleHide(stuff) {
  return function() {
    if (stuff.classList.contains("hidden")) {
      stuff.classList.remove("hidden");
    }
    else {
      stuff.classList.add("hidden");
    }
  };
}

for (var i=0; i<palettes.length; ++i) {
  let palette = palettes.item(i);
  let title = palette.getElementsByClassName("title").item(0);
  let content = palette.getElementsByClassName("content").item(0);
  title.onclick = toggleHide(content);
}