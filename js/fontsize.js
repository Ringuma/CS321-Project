var myStorage = window.localStorage;
var slider = document.getElementById("sizeSlider");
var output = document.getElementById("fontSize");

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function applyFontSize() {
  var sizeValue = slider.value;
  myStorage.setItem("fontSize", sizeValue);
  document.body.style.fontSize = myStorage.getItem("fontSize");
}

document.getElementsByName("Apply")[0].addEventListener("click", function() {
  applyFontSize();
});
