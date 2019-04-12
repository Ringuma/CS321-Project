
var myStorage = window.localStorage;
var spreadsheetURL = "../data/myAnimeListData.csv";

// event listener that displays recommendation upon opening of popup
document.addEventListener("DOMContentLoaded", function(){
  // load dataset  when popup opens for the first time
  if (myStorage.getItem("initialized") !== "true") {
    loadData( function() {
      computeRecommendation(displayRec);
    }); // loads dataset, which then calls computeRecommendation(), which then calls displayRec()
  }
  else {
    displayRec(); // displays previous recommendation
  }
}, false);

// event listener that computes a new recommendation upon clicking the refresh button
document.getElementById("refresh_button").addEventListener("click", function() {
   computeRecommendation(displayRec);
});

// function that loads spreadsheet data
function loadData(callback) {
  $.ajax({
      type: "GET",
      url: spreadsheetURL,
      dataType: "text",
      success: function(data) {
          var spreadsheetData = $.csv.toArrays(data);

          // sets localStorage item "animeData" to the stringified 2D array parsed from the spreadsheet
          myStorage.setItem("animeData", JSON.stringify(spreadsheetData));

          // "filteredData" is a subset of "animeData" that only includes entries that match the current selection of Filters
          // by default is equal to "animeData" if no filters are selected
          myStorage.setItem("filteredData", JSON.stringify(spreadsheetData));

          // Recommendation: an array that represents a single recommendation
          // first index = title
          // second index = genre array
          // third index = anime ID
          var Recommendation = [null,null,null]

          // initialized localStorage Recommendation item
          // and sets initialized value in localStorage to true
          myStorage.setItem("recommendation", JSON.stringify(Recommendation));
          myStorage.setItem("initialized", "true");

          // initializes current filters
          var filters = [];
          myStorage.setItem("currentFilters", JSON.stringify(filters));

          //computeRecommendation(); // computes initial recommendation

      },
      error: function (request, status, error) {
          alert(request.responseText);
      }
   });
   callback();
}



// this function computes a random recommendation based on given inputs
function computeRecommendation(callback) {
  // 2d array that represents current dataset for anime
  var animeData = JSON.parse(myStorage.getItem("filteredData"));
  //alert(animeData[0]);

  // check if filteredData is empty------------------------------------------------
  if (animeData.length == 0) {
    myStorage.setItem("emptyDataSet", true);
    displayRec(); // returns before displaying rec?
  }
  else {
    myStorage.setItem("emptyDataSet", false);
    // generate random index between 1-dataset length (exclude 0th index
    // because the 0th index is the header for the dataset)
    var min = 1;
    var max = animeData.length;

    // calculates random index 1 to animeData.length inclusive
    var index = Math.floor(Math.random() * (max - min + 1)) + min;

    // build Recommendation object
    // attributes: title, genre, ID, year, rating, ep count, studio
    var Recommendation = [animeData[index][1], animeData[index][3], animeData[index][0], animeData[index][2], animeData[index][10],animeData[index][5],animeData[index][8]];

    // saves current recommendation in localStorage
    myStorage.setItem("recommendation", JSON.stringify(Recommendation));
  }
  callback();
}

// this function displays the current recommendation in the popup
function displayRec() {
    if (myStorage.getItem("emptyDataSet") === "true") { // dataset is empty, display error message
      document.getElementById("description").innerHTML =
      `<h1>I'm Sorry</h1>
      <p>There is no anime that matches your choice of filters.
      Please go to the Settings page and choose a different set of filters.</p>`;
    }
    else {
      var recommendation = JSON.parse(myStorage.getItem("recommendation"));
      // changes the popup HTML to reflect current recommendation
      document.getElementById("description").innerHTML =
      `<h1>Your Recommendation</h1>
      <p>Title: ${recommendation[0]}<p>
      <p>Genre: ${recommendation[1]}</p>
      <p>Season: ${recommendation[3]}</p>
      <p>Rating: ${recommendation[4]}</p>
      <p>Episode Count: ${recommendation[5]}</p>
      <p>Studio: ${recommendation[6]}</p>
      <a target=\"_blank\" href=\"https://myanimelist.net/anime/${recommendation[2]}/${recommendation[0]}\">MAL Link.</a>`;
    }
    //callback();
}
