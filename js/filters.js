var myStorage = window.localStorage;

// applies filters in this fashion:
// if an entry matches one or more filters, add to "filteredData" array
function applyFilters() {
  var filterArray = [];

  // checks if "currentFilters" is empty, if it is, sets "filteredData" tp be value of "animeData"
  alert("Filters applied!");

  // if not empty, searches through "animeData" and adds each matching entry to "filteredData"

}

// checks to see which filter checkboxes are checked when you click "Apply" in the options.html page
// adds it to filter array in localStorage
function parseFilters() {
  var filterArray = [];
  var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

  for (var i = 0; checkedBoxes.length; i++) {
    filterArray.push(checkedBoxes[i].value);
  }

  myStorage.setItem("currentFilters", JSON.stringify(filterArray));
}

// parse currently checked filters and save state of checked filters??
document.getElementsByName("Apply")[0].addEventListener("click", function() {
  parseFilters();
  applyFilters();
  // save state of checked filters here!!!!
  // bla
});
