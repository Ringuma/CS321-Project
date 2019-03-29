
var spreadsheetURL = "../data/myAnimeListData.csv";
var sheetData = "";

$.ajax({
    type: "GET",
    url: spreadsheetURL,
    dataType: "text",
    success: function(data) {
        sheetData = $.csv.toArrays(data);
        alert(sheetData[0][0]);
    },
    error: function (request, status, error) {
        alert(request.responseText);
    }
 });

function computeRecommendation(data) {

}

function applyFilters(data, filters) {

  
}

//var clientID = "983014862567-srsvv1p8djudqjalo4onabl8qog48mdi.apps.googleusercontent.com";
//var spreadsheetID = "1brguO5nGfXS-Fr1Xcf3pqPTQoBUPGLTYM_EMAA9yJFw";
