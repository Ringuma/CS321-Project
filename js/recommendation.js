

var sheetData = "";

$.ajax({
    type: "GET",
    url: "../data/myAnimeListData.csv",
    dataType: "text",
    success: function(data) {
        alert("worked");
        sheetData = $.csv.toArrays(data);
        alert(sheetData[0][0]);
    },
    error: function (request, status, error) {
        alert(request.responseText);
    }
 });

function computeRandomRecommendation(data) {

}

//var clientID = "983014862567-srsvv1p8djudqjalo4onabl8qog48mdi.apps.googleusercontent.com";
//var spreadsheetID = "1brguO5nGfXS-Fr1Xcf3pqPTQoBUPGLTYM_EMAA9yJFw";
