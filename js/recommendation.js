
const {google} = require('googleapis');

exports.reply = (req, res) => {
  var jwt = getJwt();
  var apiKey = getApiKey();
  var sheetID = "1brguO5nGfXS-Fr1Xcf3pqPTQoBUPGLTYM_EMAA9yJFw";
  var range = "B2";

  var recommendationTitle = readSheetRow(jwt, apiKey, sheetID, range);
  console.log("Your new recommendation is " + recommendationTitle + ".");
};

function getApiKey() {
  var apiKeyFile = require("../api_key.json");
  return apiKeyFile.key;
}

function getJwt() {
  var credentials = require("../credentials.json");
  return new google.auth.JWT(
    credentials.client_email, null, credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
}

function readSheetRow(jwt, apiKey, sheetID, range) {
  const sheets = google.sheets({version: 'v4'});

  var returnObject = sheets.spreadsheets.values.get({
  spreadsheetId: sheetId,
  range: range
}).then((response) => {
  var result = response.result;
  var numRows = result.values ? result.values.length : 0;
  console.log(`${numRows} rows retrieved.`);
});

  return returnObject.values[0][0];
}
