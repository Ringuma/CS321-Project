if (window.localStorage.getItem("color") === null) {
  window.localStorage.setItem("color", "color1");
}

var savedColor = window.localStorage.getItem("color");
if (document.getElementById(savedColor) != null) {
  document.getElementById(savedColor).checked = true;
}
applyColorScheme();

function applyColorScheme() {
  var colorChosen;
  if (document.querySelector('input[name="colors"]:checked') != null) {
    colorChosen = document.querySelector('input[name="colors"]:checked').value;
    window.localStorage.setItem("color", colorChosen);
  }
  var colorSheet = document.getElementById("colorsheet");

  colorChosen = window.localStorage.getItem("color");

  switch (colorChosen) {
    default:
    case "color1":
      colorSheet.setAttribute("href", "../css/color1.css");
      break;
    case "color2":
      colorSheet.setAttribute("href", "../css/color2.css");
      break;
    case "color3":
      colorSheet.setAttribute("href", "../css/color3.css");
      break;
    case "color4":
      colorSheet.setAttribute("href", "../css/color4.css");
      break;
    case "color5":
      colorSheet.setAttribute("href", "../css/color5.css");
      break;
    case "color6":
      colorSheet.setAttribute("href", "../css/color6.css");
      break;
    case "color7":
      colorSheet.setAttribute("href", "../css/color7.css");
      break;
    case "color8":
      colorSheet.setAttribute("href", "../css/color8.css");
      break;
    case "color9":
      colorSheet.setAttribute("href", "../css/color9.css");
      break;
    case "color10":
      colorSheet.setAttribute("href", "../css/color10.css");
      break;
    case "color11":
      colorSheet.setAttribute("href", "../css/color11.css");
      break;
    case "color12":
      colorSheet.setAttribute("href", "../css/color12.css");
      break;
    case "color13":
      colorSheet.setAttribute("href", "../css/color13.css");
      break;
    case "color14":
      colorSheet.setAttribute("href", "../css/color14.css");
      break;
    case "color15":
      colorSheet.setAttribute("href", "../css/color15.css");
      break;
    case "color16":
      colorSheet.setAttribute("href", "../css/color16.css");
      break;
  }
}

// add event listener to apply button and run the applyColorScheme() function
if (document.getElementsByName("Apply")[0] != null) {
  document.getElementsByName("Apply")[0].addEventListener("click", function() {
    applyColorScheme();
  });
}
