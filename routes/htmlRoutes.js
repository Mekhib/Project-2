var db = require("../models");
var path = require("path");

module.exports = function(app) {
        // Load index page
        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/login.html"))
        });
        app.get("/signup", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/registration.html"))
        });
        app.get("/home", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/Untitled-1.html"))
        });
        app.get("/searchresults", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/searchresults.html"))
        });
        app.get("/userresult", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/userpage.html"))
        });
        app.get("/friendrequest", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/FriendRequest.html"))
        });
    }
    //   // Load example page and pass in an example by id
    //   app.get("/example/:id", function(req, res) {
    //     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //       res.render("example", {
    //         example: dbExample
    //       });
    //     });
    //   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };