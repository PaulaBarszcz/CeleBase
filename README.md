# CeleBase
Webpage containing quiz, slider and infotable - all with super-cool pictures of actors&amp;actresses. 

To import data from Google StyleSheets to Firebase, this script was used:


```javascript
var firebaseLink =  "...";
var firebaseSecret  =  "...";
function save_actors() {
    var sheets  =  SpreadsheetApp.getActiveSpreadsheet().getSheets();
    var data = [];
    for (var i  = 0; i < sheets.length; i++){
    var sheet = sheets[i];
    var rows = sheet.getDataRange();
    var numRows = rows.getNumRows();
    var numCols = rows.getNumColumns();
    var values = rows.getValues();
    for (var j  = 2; j < numRows; j++) {
        var actor = {};
        actor.id = values[j][0];
        actor.name = values[j][1];
        actor.surname = values[j][2];
        actor.gender = values[j][3];
        actor.nationality = values[j][4];
        actor.photo = values[j][5];
        actor.imdb = values[j][6];
        data.push(actor);
    }
}
var firebase = FirebaseApp.getDatabaseByUrl(firebaseLink,firebaseSecret);
  firebase.setData("", data);
}
```