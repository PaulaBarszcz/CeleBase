# CeleBase
## Webpage containing quiz, slider and infotable - all with super-cool pictures of actors&amp;actresses. 

### Demo: https://paulabarszcz.github.io/CeleBase/#/

#### React, ES7, ES6, webpack, HTML5, CSS3 were used.

For development I used webpack dev server.
In webpack, Babel transpiler was used with ['es2015', 'stage-2', 'react'] presets.
For production webpack was used to generate styles&scripts.

I prepared the database with links to actors' pictures, their imdb profiles and nationalities in Google Sheets.

To import data from Google Sheets to Firebase, I ran the following script (and afterwards Fetch was used):


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
