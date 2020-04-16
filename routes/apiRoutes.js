// ============================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ============================================================
var tableData = require("../db/tableData");
// var nextID

// =============================================================
// ROUTING
// =============================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: GET localhost:PORT/api/notes -- display all notes 
  // -----------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    console.log("api route GET /api/notes called ", req.originalUrl)
    res.json(tableData);
    console.log("Table Data", tableData)
  });


  // API POST Requests
  // Below code handles when a user submits form data 
  // (a JSON object) 
  // object was pushed into onto full JSON object array, 
  // then item will be written to file
  //---------------------------------------------------------

  // yet to be impleted!!!!!!!
  app.post("/api/notes", function (req, res) {
    console.log("api route POST /api/notes called ", req.body)
    var r = req.body;
    r.id = (tableData.length).toString()
    console.log("Note assigned ID = ", r.id)
    tableData.push(r);
    tableData.writeTable(tableData)
    res.json(true);
  });

  // ----------------------------------------------------------
  // API DELETE Requests
  // need note ID, confirms, deletes, rewrite updated db.json

  // yet to be implemented!!!!!!
  app.delete("/api/notes/:id", function (req, res) {





  });

  // this part is debug code and probably doesn't work
  // will think about complete later
  app.delete("/api/notes/deleteall", function (req, res) {
    // Empty out the arrays of data
    // tableData.length = [];
    // waitListData.length = [];

    // res.json({ ok: true });
  });
};


