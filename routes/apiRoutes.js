// ============================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ============================================================
var tableData = require("../db/tableData");
var nextID = tableData.nextID

console.log("NextID = ", nextID)
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
    res.json(tableData.tb);
    console.log("Table Data", tableData.tb)
  });


  // API POST Requests
  // Below code handles when a user submits form data 
  // (a JSON object) 
  // object was pushed into onto full JSON object array, 
  // then item will be written to file
  //---------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    console.log("api route POST /api/notes called ", req.body)
    var r = req.body;
    r.id = (nextID++).toString()
    console.log("Note assigned ID = ", r.id)
    tableData.tb.push(r);
    tableData.writeTable(tableData.tb)
    res.json(r);
    console.log("Note assigned ID = ", r)
  });

  // ----------------------------------------------------------
  // API DELETE Requests
  // need note ID, confirms, deletes, rewrite updated db.json

  // utility function to remove array element if id=value
  function arrayRemove(arr, value) {
    return arr.filter(
      function (ele) {
        return ele.id != value;
      });
  }

  // DELETE function just needs parameter of ID
  app.delete("/api/notes/:id", function (req, res) {
    var delId = req.params.id
    var tableData2
    console.log("api route DELETE /api/notes/:id called ", delId)
    tableData2 = arrayRemove(tableData.tb, delId);
    console.log("TableData =", tableData2)
    tableData.writeTable(tableData2)
    tableData.tb = tableData2
    res.json({ message: `If Note ${delId} is there, it was deleted` })
  });

  // this part is debug code and probably doesn't work
  // will think about complete later
  // app.delete("/api/notes/deleteall", function (req, res) {
  // Empty out the arrays of data
  // tableData.length = [];
  // waitListData.length = [];

  // res.json({ ok: true });
  // });
};


