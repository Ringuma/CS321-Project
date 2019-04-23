
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
    // displays previous recommendation
    displayRec();
  }
}, false);

var port = chrome.runtime.connect({name:"timer"}); //create a responder to message sent from the background.js
port.onMessage.addListener(function(message,sender){
  if(message.check == "there"){ //if the message from background.js is "there", a new recommendation is computed. Otherwise, it will display the previous recommendation.
	computeRecommendation(displayRec);
  }else{
	displayRec();
  }
});

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

          // initializes recommendation image to null
          myStorage.setItem("recommendationImage", "null");

          // removes blacklisted filters from localStorage
          excludeFilters( function() {
            callback();
          });

      },
      error: function (request, status, error) {
          alert(request.responseText);
      }
   });


}


function excludeFilters(callback) {
  var excludedFilters = ["Hentai", "Ecchi", "Shoujo Ai", "Shounen Ai", "Yaoi", "Yuri"];
  var newDataSet = [];
  var dataSet = JSON.parse(myStorage.getItem("animeData"));

  for (var i = 0; i < dataSet.length; i++) {
    var found = false;

    for (var j = 0; j < excludedFilters.length; j++) {
      // if "bad" filter is found, breaks out of loop
      if (dataSet[i][3].indexOf(excludedFilters[j]) !== -1) {
        found = true;
        break;
      }
    }

    // if "bad" filter not found, adds to new dataset
    if (!found) {
      newDataSet.push(dataSet[i]);
    }
  }

  //store newDataSet
  myStorage.setItem("animeData", JSON.stringify(newDataSet));
  myStorage.setItem("filteredData", JSON.stringify(newDataSet));
  callback();
}


// this function computes a random recommendation based on given inputs
function computeRecommendation(callback) {
  // 2d array that represents current dataset for anime
  var animeData = JSON.parse(myStorage.getItem("filteredData"));

  console.log(myStorage.getItem("filteredData"));

  // check if filteredData is empty------------------------------------------------
  if (animeData == undefined || animeData.length == 0) {
    myStorage.setItem("emptyDataSet", true);
    displayRec();
    return;
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
      `<h3>I'm Sorry</h3>
      <p>There is no anime that matches your choice of filters.
      Please go to the Settings page and choose a different set of filters.</p>`;
      // default image
      document.getElementById("cover_art").innerHTML =
      `<img src="https://media.giphy.com/media/j0eyAxbJ53mMM/giphy.gif"/>`;
      }

    else {
      var recommendation = JSON.parse(myStorage.getItem("recommendation"));
      // split title by spaces    
      var splitTitle = recommendation[0].split(" ");
      var titleURL = "";

      // builds the title with URL space character "%20" so it can be inserted into the MAL page URL
      for (var i = 0; i < splitTitle.length; i++) {
        if ((i + 1) == splitTitle.length) {
          titleURL += splitTitle[i];
        }
        else {
          titleURL += splitTitle[i] + "%20";
        }
      }

      var animeURL = `https://myanimelist.net/anime/${recommendation[2]}/${recommendation[0]}`;
      // changes the popup HTML to reflect current recommendation
      document.getElementById("description").innerHTML =
      `<h1>Your Recommendation</h1>
      <p>Title: ${recommendation[0]}<p>
      <p>Genre: ${recommendation[1]}</p>
      <p>Season: ${recommendation[3]}</p>
      <p>Rating: ${recommendation[4]}</p>
      <p>Episode Count: ${recommendation[5]}</p>
      <p>Studio: ${recommendation[6]}</p>
      <a target=\"_blank\" href=${animeURL}>MAL Link.</a>`;

      //changes popup image to match current recommendation
      // if null, display default image?
      getImageURL(animeURL, function() {
        if (myStorage.getItem("recommendationImage") != "null") { // anime cover art
          document.getElementById("cover_art").innerHTML =
          `<img src="${myStorage.getItem("recommendationImage")}"/>`;
        }
      });
    }
}

function getImageURL(animeURL, callback) {
    var url = animeURL;
    var malHTML = "";
    var imageURL = "";

    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET", animeURL, false);
    xmlhttp.send();
    var malHTML = xmlhttp.responseText;

    console.log(malHTML);

    var dom_nodes = $($.parseHTML(malHTML));
    var allImages = dom_nodes.contents().find('img');
    var alt = JSON.parse(myStorage.getItem("recommendation"))[0]; // alt is title of anime

    for (var i = 0; i < allImages.length; i++) {
        if (allImages[i].alt == alt) {
            imageURL = allImages[i].src;
            break;
        }
    }

    myStorage.setItem("recommendationImage", imageURL);

    console.log(imageURL);
    callback();
}
