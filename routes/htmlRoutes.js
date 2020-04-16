var path = require("path");


// ============================================================
// ROUTING
// ============================================================
module.exports = function (app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown 
  // an HTML page of content
  //----------------------------------------------------------
  app.get("/assets/js/index.js", function (req, res) {
    console.log("html for index.js called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
  });

  app.get("/assets/css/styles.css", function (req, res) {
    console.log("html for styles.css called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
  });

  app.get("/notes", function (req, res) {
    console.log("html route /notes called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });



  // If no matching route is found default to home
  app.get("*", function (req, res) {
    console.log("html route / called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
