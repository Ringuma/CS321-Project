
var myStorage = window.localStorage;
var spreadsheetURL = "../data/myAnimeListData.csv";
var sheetData = [];

// load dataset and compute recommendation when popup loads
document.addEventListener("DOMContentLoaded", function(){
  loadData();
  computeRecommendation();
}, false);

document.getElementById("refresh_button").addEventListener("click", function() {
   //alert("click!");
   computeRecommendation();
})

function loadData() {
  $.ajax({
      type: "GET",
      url: spreadsheetURL,
      dataType: "text",
      success: function(data) {
          sheetData = $.csv.toArrays(data);
          myStorage.setItem("animeData", JSON.stringify(sheetData));
      },
      error: function (request, status, error) {
          alert(request.responseText);
      }
   });
}

 var Recommendation = {
   title: "",
   matchingGenres: [],
   link: "",
 }



function computeRecommendation() {
  var animeData = JSON.parse(myStorage.getItem("animeData"));

  // generate random index between 1-dataset length (excluse 0th index
  // because the 0th index is the header for the dataset)
  var min = 1;
  var max = animeData.length;

  // calculates random index 1-animeData.length inclusive
  var index = Math.floor(Math.random() * (max - min + 1)) + min;

  // build Recommendation object
  Recommendation.title = animeData[index][1];
  //alert("Computed");
  displayRec();
  //alert("Displayed");
}

function displayRec() {
  if (myStorage.getItem("animeData")) {
    //computeRecommendation();
    document.getElementById("description").innerHTML =
    "<h1>" + Recommendation.title + "<h1>";
    //alert("Data replaced");
  }
  else {
    document.getElementById("description").innerHTML = "<p>Database is not available.<p>";
    alert("Data not loaded");
  }
  //alert("At end of displayRec()");
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
