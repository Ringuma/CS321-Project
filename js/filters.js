var myStorage = window.localStorage; // reference to localStorage

// applies filters in this fashion:
// if an entry matches all filters, add to "filteredData" array
function applyFilters(callback) {
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

  // checks for no selected filters
  if (!filtersNotEmpty) {
    myStorage.setItem("filteredData", myStorage.getItem("animeData"));
    alert("Filters applied! Please refresh your recommendation for changes to be applied.");
    callback();
    return;
  }

  /* if not empty, searches through "animeData" and adds each matching entry to "filteredData"
     checks if each index of "currentFilters" contains data (not just []), and if it does,
     searches that index in "animeData" for matches
     operates on the logic where if the entry matches 1 or more filters, it will be added to the filterArray
     brute force method, needs to be optimized */
  for (var i = 1; i < animeData.length; i++) { // starts at index 1 because index 0 is table header
    // only adds anime to "filteredData" if it matches all selected filters
    var found = true;

    // genre-------------------------------------------------------------------------------------------------
    if (currentFilters[0].length !== 0) {
      var entryGenres = animeData[i][3];

      for (var j = 0; j < currentFilters[0].length; j++) {
        if (!(entryGenres.indexOf(currentFilters[0][j]) != -1) || entryGenres.length == 0) { // index isn't -1, so exists in array
          found = false;
        }
      }
    }

    // rating------------------------------------------------------------------------------------------------
    if (found && currentFilters[1].length !== 0) {
      console.log("Searching for rating filters..")
      var entryRating = animeData[i][10];
      var filterRatingMin = currentFilters[1][0];
      var filterRatingMax = currentFilters[1][1];

      if (entryRating == "None" || entryRating == 0 || ! (parseFloat(entryRating) >= filterRatingMin) || ! (parseFloat(entryRating) <= filterRatingMax) ) {
        found = false;
      }
    }

    // studio-------------------------------------------------------------------------------------------------
    if (found && currentFilters[2].length !== 0) {
      var entryStudios = animeData[i][8];

      for (var j = 0; j < currentFilters[2].length; j++) {
        if (!(entryStudios.indexOf(currentFilters[2][j]) != -1) || entryStudios.length == 0) { // index isn't -1, so exists in array
          found = false;
        }
      }
    }

    // ep count-------------------------------------------------------------------------------------------------
    if (found && currentFilters[3].length !== 0) {
      var entryEpCount = animeData[i][5];
      var filterCountMin = currentFilters[3][0];
      var filterCountMax = currentFilters[3][1];

      if (entryEpCount == "None" || entryEpCount == 0 || ! (parseFloat(entryEpCount) >= filterCountMin) || ! (parseFloat(entryEpCount) <= filterCountMax)) {
        found = false;
      }
    }

    // year-------------------------------------------------------------------------------------------------
    if (found && currentFilters[4].length !== 0) {
      var entryYear = animeData[i][2].split(" ")[1];
      var filterYearMin = currentFilters[4][0];
      var filterYearMax = currentFilters[4][1];

      if (entryYear == "None" || entryYear == 0 || ! (parseFloat(entryYear) >= filterYearMin) || ! (parseFloat(entryYear) <= filterYearMax)) {
        found = false;
      }
    }

    // passed all tests?-------------------------------------------------------------------------------------------------
    if (found) {
      filteredData.push(animeData[i]);
    }
  }

  myStorage.setItem("filteredData", JSON.stringify(filteredData));
  alert("Filters applied! Please refresh your recommendation for changes to be applied.");
  callback();
}

// checks to see which filter checkboxes are checked when you click "Apply" in the options.html page
// adds it to filter array in localStorage
function parseFilters(callback) {
  var filterArray = [[],[],[],[],[]];
  var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

  for (var i = 0; i < checkedBoxes.length; i++) {
    // search for name substring to put genre in appropriate subarray

    // genre ------------------------------------------------------------------------------------------------
    if (checkedBoxes[i].name.includes("genre")) {
      filterArray[0].push(checkedBoxes[i].value);
    }

    // rating ------------------------------------------------------------------------------------------------
    else if (checkedBoxes[i].name.includes("rating")) { // range, only record lowest and highest VALUES
      if (filterArray[1].length == 0) {
        filterArray[1].push(checkedBoxes[i].getAttribute("value1"));
        filterArray[1].push(checkedBoxes[i].getAttribute("value2"));
      }
      else { // if new max is encountered, replaces max value
        filterArray[1].pop();
        filterArray[1].push(checkedBoxes[i].getAttribute("value2"));
      }

    }

    // studio ------------------------------------------------------------------------------------------------
    else if (checkedBoxes[i].name.includes("studio")) {
      filterArray[2].push(checkedBoxes[i].value);
    }

    // episode count ------------------------------------------------------------------------------------------------
    else if (checkedBoxes[i].name.includes("ecount")) {
      if (filterArray[3].length == 0) {
        filterArray[3].push(checkedBoxes[i].getAttribute("value1"));
        filterArray[3].push(checkedBoxes[i].getAttribute("value2"));
      }
      else { // if new max is encountered, replaces max value
        filterArray[3].pop();
        filterArray[3].push(checkedBoxes[i].getAttribute("value2"));
      }
    }

    // year ------------------------------------------------------------------------------------------------
    else if (checkedBoxes[i].name.includes("year")) {
      if (filterArray[4].length == 0) {
        filterArray[4].push(checkedBoxes[i].getAttribute("value1"));
        filterArray[4].push(checkedBoxes[i].getAttribute("value2"));
      }
      else { // if new max is encountered, replaces max value
        filterArray[4].pop();
        filterArray[4].push(checkedBoxes[i].getAttribute("value2"));
      }
    }

  }

  console.log("done parsing -- filtered array is " + filterArray);

  myStorage.setItem("currentFilters", JSON.stringify(filterArray));
  callback();
}

// records the state of the checked boxes on the page, stores 1D array for simpler matching in checkTheBoxes()
// saves the names of the previously checked boxes, as each name is unique
function recordCheckedBoxes() {
  var currentCheckedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
  var checkedBoxesNames = [];

  for (var i = 0; i < currentCheckedBoxes.length; i++) {
    checkedBoxesNames.push(currentCheckedBoxes[i].name);
  }

  myStorage.setItem("checkedBoxes", JSON.stringify(checkedBoxesNames));
}

// recalls previous state of checked boxes and rechecks them upon opening the Settings page
function checkTheBoxes() {
  if ((myStorage.getItem("checkedBoxes") != null) || (JSON.parse(myStorage.getItem("checkedBoxes")).length != 0)) {
    var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
    var previouslyCheckedBoxes = JSON.parse(myStorage.getItem("checkedBoxes"));

    for (var i = 0; i < allCheckboxes.length; i++) {
      if (previouslyCheckedBoxes.indexOf(allCheckboxes[i].name) !== -1) { // if box was previously checked
        document.getElementsByName(allCheckboxes[i].name)[0].checked = true; // checks them
      }
    }
  }
}

// rechecks boxes when page is loaded
document.addEventListener("DOMContentLoaded", function() {
  checkTheBoxes();
});

// parse currently checked filters and save state of checked filters??
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  parseFilters( function() {
    applyFilters(recordCheckedBoxes);
  });

});
