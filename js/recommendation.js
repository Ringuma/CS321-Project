
var myStorage = window.localStorage;
var spreadsheetURL = "../data/myAnimeListData.csv";

// event listener that displays recommendation upon opening of popup
document.addEventListener("DOMContentLoaded", function(){

  // load dataset  when popup opens for the first time
  if (myStorage.getItem("initialized") !== "true") {
    loadData(); // loads dataset, which then calls computeRecommendation(), which then calls displayRec()
    //computeRecommendation();
    //console.log("first compute!");
  }
  else {
    // displays previous recommendation
    displayRec();
  }
}, false);

// event listener that computes a new recommendation upon clicking the refresh button
document.getElementById("refresh_button").addEventListener("click", function() {
   computeRecommendation();
})

// function that loads spreadsheet data
function loadData() {
  $.ajax({
      type: "GET",
      url: spreadsheetURL,
      dataType: "text",
      success: function(data) {
          // sets localStorage item "animeData" to the stringified 2D array parsed from the spreadsheet
          myStorage.setItem("animeData", JSON.stringify($.csv.toArrays(data)));

          // Recommendation: an array that represents a single recommendation
          // first index = title
          // second index = genre array
          // third index = anime ID
          var Recommendation = [null,null,null]

          // initialized localStorage Recommendation item
          // and sets initialized value in localStorage to true
          myStorage.setItem("recommendation", JSON.stringify(Recommendation));
          myStorage.setItem("initialized", "true");
          // console.log(myStorage.getItem("recommendation") + " is initialized == " + myStorage.getItem("initialized"));
          computeRecommendation(); // computes initial recommendation
      },
      error: function (request, status, error) {
          alert(request.responseText);
      }
   });
}



// this function computes a random recommendation based on given inputs
function computeRecommendation() {
  console.log("in computeRec");
  // 2d array that represents current dataset for anime
  var animeData = JSON.parse(myStorage.getItem("animeData"));

  // generate random index between 1-dataset length (excluse 0th index
  // because the 0th index is the header for the dataset)
  var min = 1;
  var max = animeData.length;

  // calculates random index 1 to animeData.length inclusive
  var index = Math.floor(Math.random() * (max - min + 1)) + min;

  // build Recommendation object
  var Recommendation = [animeData[index][1], animeData[index][3], animeData[index][0]];

  // saves current recommendation in localStorage
  myStorage.setItem("recommendation", JSON.stringify(Recommendation));

  // displays the recommendation
  displayRec();
}

// this function displays the current recommendation in the popup
function displayRec() {
    var recommendation = JSON.parse(myStorage.getItem("recommendation"));
    // changes the popup HTML to reflect current recommendation
    document.getElementById("description").innerHTML =
    `<h1>Your Recommendation</h1>
    <p>Title: ${recommendation[0]}<p>
    <p>Genre: ${recommendation[1]}</p>
    <a target=\"_blank\" href=\"https://myanimelist.net/anime/${recommendation[2]}/${recommendation[0]}\">MAL Link.</a>`;
    //console.log("recommendation = " + myStorage.getItem("recommendation") + "\n initialized = " + myStorage.getItem("initialized"));
}

function applyFilters(data, filters) {


}
/*
document.addEventListener("load", function() {
  computeRecommendation();
});
*/
//var clientID = "983014862567-srsvv1p8djudqjalo4onabl8qog48mdi.apps.googleusercontent.com";
//var spreadsheetID = "1brguO5nGfXS-Fr1Xcf3pqPTQoBUPGLTYM_EMAA9yJFw";
