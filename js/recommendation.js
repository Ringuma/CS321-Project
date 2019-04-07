
var myStorage = window.localStorage;
var spreadsheetURL = "../data/myAnimeListData.csv";
//var sheetData = [];
//var Recommendation = null;

// load dataset and compute recommendation when popup loads
document.addEventListener("DOMContentLoaded", function(){

  // checks to see if recommendation was already computed
  if (myStorage.getItem("initialized") !== "true") {
    loadData();
    //computeRecommendation();
    console.log("first compute!");
  }
  else {
    displayRec();
  }


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
          myStorage.setItem("animeData", JSON.stringify($.csv.toArrays(data)));

          // first, title; second, genre array; third, link string
          var Recommendation = [null,null,null]
          myStorage.setItem("recommendation", JSON.stringify(Recommendation));
          myStorage.setItem("initialized", "true");
          console.log(myStorage.getItem("recommendation") + " is initialized == " + myStorage.getItem("initialized"));
          computeRecommendation();
      },
      error: function (request, status, error) {
          alert(request.responseText);
      }
   });
}




function computeRecommendation() {
  console.log("in computeRec");
  var animeData = JSON.parse(myStorage.getItem("animeData"));

  // generate random index between 1-dataset length (excluse 0th index
  // because the 0th index is the header for the dataset)
  var min = 1;
  var max = animeData.length;

  // calculates random index 1-animeData.length inclusive
  var index = Math.floor(Math.random() * (max - min + 1)) + min;

  // build Recommendation object
  var Recommendation = [animeData[index][1], animeData[index][3], "bla"];

  myStorage.setItem("recommendation", JSON.stringify(Recommendation));

  displayRec();
}

function displayRec() {
  //if (myStorage.getItem("animeData")) {
    document.getElementById("description").innerHTML =
    "<h1>" + JSON.parse(myStorage.getItem("recommendation"))[0] + "<h1>";
    console.log("recommendation = " + myStorage.getItem("recommendation") + "\n initialized = " + myStorage.getItem("initialized"));
    //myStorage.setItem("recommendation", myStorage.getItem("recommendation"));
  //}
  //else {
  //  document.getElementById("description").innerHTML = "<p>Database is not available.<p>";
  //  alert("Data not loaded");
  //}
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
