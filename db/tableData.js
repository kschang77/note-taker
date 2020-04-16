// This defines the various methods one can use to
// interact with db.json

// NOTE: This is not multi-user. 
const path = require("path");
const fs = require("fs");
// const db = require("../db/db.json");
const dbpath = path.join(__dirname, "../db/db.json")

// module.exports = function (app) {

// readtable -- read the db.json into tableArray[]
var tableArray = [{ "id": "0", "title": "", "text": "" }];

// // read the db.json and stuff it into tableArray
// function readTable(tblArr) {
try {
  const jsonString = fs.readFileSync(dbpath)
  tableArray = JSON.parse(jsonString)
} catch (e) {
  console.error("readFileSync or JSON.parse failed, db.json not loaded ", e)
}
// }
var nextID = "";
for (i = 0; i < tableArray.length; i++) {
  if (nextID < tableArray[i].id) {
    nextID = tableArray[i].id
  }
}
nextID++;


// // writetable -- write the tableArray[] to db.json
function writeTable(tblArr) {
  try {
    const jsonString = JSON.stringify(tblArr)
    fs.writeFileSync(dbpath, jsonString)
    console.log("writeFileSync successful, db.json updated")
  } catch (e) {
    console.error("writeFileSync or JSON.stringify failed ", e)
  }
}

// };

module.exports = tableArray;

module.exports.writeTable = writeTable;

module.exports.nextID = nextID;