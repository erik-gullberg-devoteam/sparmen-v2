const sparm = require('./resources/sparmen.json');
const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'varglad'
};
function addToDatabase(query, values){
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Sucess!');
    }
  });
}
const connection = mysql.createConnection(config);
var spex_id = 1;
var show_id = 1;
var song_id = 1;
//Populate spex, year and songs into spex and songs table
for(var spex in sparm){                       //Loops through every spex
  var nbr_spex = spex.split('_')              //Divide string (example: 1_En Karnevalssaga -> [1, En Karnevalssaga])
  addToDatabase('INSERT INTO spex(spex_id, spex_name, context) VALUES (?, ?, NULL)', [spex_id, nbr_spex[1]])
  
  for(var year in sparm[spex]){               //Loops through every year
    if(year === 'meta'){
      continue;
    }
    addToDatabase('INSERT INTO shows(show_id, year, spex_id) VALUES (?, ?, ?)', [show_id, year, spex_id])

    for(var songNbr in sparm[spex][year]){    //Loops through every song
      var song = sparm[spex][year][songNbr];
      addToDatabase('INSERT INTO songs(song_id, song_name, text, context, show_id) VALUES (?, ?, ?, NULL, ?)', [song_id, song['name'], song['text'], show_id])
      song_id++;
    }
    show_id++;
  }
  spex_id++;
}
connection.end();