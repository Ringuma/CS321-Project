function applyColorScheme() {
  var colorChosen = document.querySelector('input[name="colors"]:checked').value;
  var colorSheet = document.getElementById("colorsheet");

  window.localStorage.setItem("color", colorChosen);

  switch (colorChosen) {
    default:
    case "color1":
      colorSheet.setAttribute("href", "../css/color1.css");
      break;
    case "color2":
      colorSheet.setAttribute("href", "../css/color2.css");
      break;
    case "color3":
      break;
    case "color4":
      break;
    case "color5":
      break;
    case "color6":
      break;
    case "color7":
      break;
    case "color8":
      break;
    case "color9":
      break;
    case "color10":
      break;
    case "color11":
      break;
    case "color12":
      break;
    case "color13":
      break;
    case "color14":
      break;
    case "color15":
      break;
    case "color16":
      break;
  }
}

// add event listener to apply button and run the applyColorScheme() function
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  applyColorScheme();
});
