function applyColorScheme() {
  colorChosen = document.querySelector('input[name="colors"]:checked').value;
  myStorage.setItem("color", colorChosen);
}

// add event listener to apply button and run the applyColorScheme() function
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  applyColorScheme();
});
