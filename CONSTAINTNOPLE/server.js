require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 4503;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


function isAuthenticated(req, res, next) {
    if (req.session.loggedin) {
        return next();
    }
    res.redirect('/');
}
app.post("/auth", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        db.profiles.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then((results) => {
            if (results) {
                req.session.loggedin = true;
                req.session.id = results.id;
                req.session.user = results;
                console.log(req.session);
                res.json(req.session.user);
            } else {
                res.send('Incorrect Username and/or Password!');
            }

        })
    }
    //INSERT ELSE STATMENT IF USER DOES NOT PUT IN AN EMAIL OR PASSWORD!
});
// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// // Routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;
// var passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
// app.get('/error', (req, res) => res.send("error logging in"));

// passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//     User.findById(id, function(err, user) {
//         cb(err, user);
//     });
// });