// the font size slider
var slider = document.getElementById("sizeSlider");
// the displayed text of what the current value of the font size slider is
var output = document.getElementById("fontSize");

// check if the user has set the font size before
// if the user has never used the font slider before then set the default value as 16
if (window.localStorage.getItem("fontSize") === null) {
  window.localStorage.setItem("fontSize", 16);
}

slider.value = window.localStorage.getItem("fontSize");
document.body.style.fontSize = window.localStorage.getItem("fontSize") + "px";

// get the value from the slider and have the html display the value
output.innerHTML = slider.value;

// while the user is using the slider, update the html to display the value of the slider as it is being moved
slider.oninput = function() {
  output.innerHTML = this.value;
}

// apply the font size permamently when the apply button is pressed
// if the apply button is not pressed, don't save the font size value to localStorage yet
function applyFontSize() {
  // save the font size value to a key "fontSize" in the localStorage
  window.localStorage.setItem("fontSize", slider.value);
  // get the saved fontSize value from the localStorage and apply it to the body of the html
  // basically sets the <body style="font-size:fontSize"> html tags with the style changed
  document.body.style.fontSize = window.localStorage.getItem("fontSize") + "px";
}
// add event listener to apply button and run the applyFontSize() function
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  applyFontSize();
});
