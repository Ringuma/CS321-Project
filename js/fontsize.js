// localStorage variable to save user selected font size
var myStorage = window.localStorage;
// the font size slider
var slider = document.getElementById("sizeSlider");
// the displayed text of what the current value of the font size slider is
var output = document.getElementById("fontSize");

// check if the user has set the font size before
// if the user has never used the font slider before then set the default value as 16
if (myStorage.getItem("fontSize") === null) {
  myStorage.setItem("fontSize", 16);
}

slider.value = myStorage.getItem("fontSize");
document.body.style.fontSize = myStorage.getItem("fontSize") + "px";

// get the value from the slider and have the html display the value
output.innerHTML = slider.value;

// while the user is using the slider, update the html to display the value of the slider as it is being moved
slider.oninput = function() {
  output.innerHTML = this.value;
}

// apply the font size permamently when the apply button is pressed
// if the apply button is not pressed, don't save the font size value to localStorage yet
function applyFontSize() {
  // get the current value of the slider
  var sizeValue = slider.value;
  // save the font size value to a key "fontSize" in the localStorage
  myStorage.setItem("fontSize", sizeValue);
  // get the saved fontSize value from the localStorage and apply it to the body of the html
  // basically sets the <body style="font-size:fontSize"> html tags with the style changed
  document.body.style.fontSize = myStorage.getItem("fontSize") + "px";
}
// add event listener to apply button and run the applyFontSize() function
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  applyFontSize();
});
