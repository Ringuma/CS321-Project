var myStorage = window.localStorage;

// applies filters in this fashion:
// if an entry matches one or more filters, add to "filteredData" array
function applyFilters() {
  // a 2D array representing current Filters
  // has 5 entries, each entry corresponding to an array of filters from that section
  // in order of: Genre, Rating, Studio, Episode Count, Year of Production
  // an entry with no filters selected will just be an empty array

  console.log("in applyFilters");

  var filteredData = []; // array to contain filtered set of anime entries
  var animeData = JSON.parse(myStorage.getItem("animeData")); // full anime entry dataset array
  var currentFilters = JSON.parse(myStorage.getItem("currentFilters")); // current chosen filters
  var filtersNotEmpty = false;

  // checks if "currentFilters" is empty, if it is, sets "filteredData" to be value of "animeData"
  for (var i = 0; i < currentFilters.length; i++) {
    if (currentFilters[i].length !== 0) {
      filtersNotEmpty = true;
      break;
    }
  }

  if (!filtersNotEmpty) {
    myStorage.setItem("filteredData", myStorage.getItem("animeData"));
    return;
  }

  // if not empty, searches through "animeData" and adds each matching entry to "filteredData"
  // checks if each index of "currentFilters" contains data (not just []), and if it does,
  // searches that index in "animeData" for matches
  // operates on the logic where if the entry matches 1 or more filters, it will be added to the filterArray
  // brute force method, needs to be optimized
  for (var i = 1; i < animeData.length; i++) { // starts at index 1 because index 0 is table header
    // genre
    var found = false;
    for (var j = 0; j < currentFilters[0].length; j++) {
      if (animeData[i][3].indexOf(currentFilters[0][j]) != -1) { // index isn't -1, so exists in array
        filteredData.push(animeData[i]);
        found = true;

        break;
      }
    }

    // checks if found in previous loop
    if (found) {
      continue;
    }

    // rating
    if (animeData[i][10] == currentFilters[1]) { // rating located at 10th index of anime entry
      filteredData.push(animeData[i]);

      continue;
    }

    // studio
    for (var j = 0; j < currentFilters[2].length; j++) {
      if (animeData[i][8].indexOf(currentFilters[2][j]) != -1) { // index isn't -1 so exists in array
        filteredData.push(animeData[i]);
        found = true;

        break;
      }
    }

    // checks if found in previous loop
    if (found) {
      continue;
    }

    // ep Count
    if (animeData[i][5] == currentFilters[3]) {
      filteredData.push(animeData[i]);

      continue;
    }

    // year
    if (animeData[i][2].includes(currentFilters[4])) {
      filteredData.push(animeData[i]);

      continue;
    }

  }

  myStorage.setItem("filteredData", JSON.stringify(filteredData));
  alert("Filters applied! Please refresh your recommendation for changes to be applied." + filteredData);
}

// checks to see which filter checkboxes are checked when you click "Apply" in the options.html page
// adds it to filter array in localStorage
function parseFilters() {
  var filterArray = [[],[],[],[],[]];
  var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

  for (var i = 0; i < checkedBoxes.length; i++) {
    // search for name substring to put genre in appropriate subarray
    if (checkedBoxes[i].name.includes("genre")) {
      filterArray[0].push(checkedBoxes[i].value);
    }
    else if (checkedBoxes[i].name.includes("rating")) {
      filterArray[1].push(checkedBoxes[i].value);
    }
    else if (checkedBoxes[i].name.includes("studio")) {
      filterArray[2].push(checkedBoxes[i].value);
    }
    else if (checkedBoxes[i].name.includes("ecount")) {
      filterArray[3].push(checkedBoxes[i].value);
    }
    else if (checkedBoxes[i].name.includes("year")) {
      filterArray[4].push(checkedBoxes[i].value);
    }

  }

  console.log("done parsing -- filtered array is " + filterArray);

  myStorage.setItem("currentFilters", JSON.stringify(filterArray));
}

// recalls previous state of checked boxes and rechecks them upon opening the Settings page
function checkTheBoxes() {

}

// parse currently checked filters and save state of checked filters??
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  parseFilters();
  applyFilters();
  checkTheBoxes(); // save state of checked filters here!!!!
  // bla
});
