var db = require("../models");

module.exports = function(app) {

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

        app.post("/signupinfo", function(req, res) {
            console.log(req.body);
            db.profiles.create({
                    email: req.body.email,
                    first_name: req.body.firstName,
                    last_name: req.body.lastname,
                    password: req.body.password
                        //Password is not being inserted into database! find out why!
                })
                .then(function(dbPost) {
                    res.json(dbPost);
                });
        });
        app.get("/searchresults/:email", function(req, res) {
            console.log("searchresults")
            console.log(req.params.email)
            db.profiles.findAll({
                where: {
                    email: req.params.email
                }
            })
            .then(function(response) {
            res.json(response)
        })
    })
        app.post("/searchresults", isAuthenticated,
            function(req, res) {
                console.log(req.body);
                db.profiles.findAll({
                    where: {
                        email: req.body.email
                    }
                }).then(function(response) {
                    res.json(response)
                })
            })
        app.post("/userpage", isAuthenticated, function(req, res) {
            console.log(req.body);
            db.profiles.findone({
                where: {
                    id: req.body.id
                }
            }).then(function(response) {
                res.json(response)
            })
        })
        app.post("/sendfriendrequest", isAuthenticated, function(req, res) {
            db.request.create({
                requester: req.body.requester,
                recipient: req.body.recipient
            }).then(function(response) {
                res.json(response);
            })
        })
    }
    // function isAuthenticated(req, res, next) {
    //     if (req.session.loggedin) {
    //         return next();
    //     }
    //     res.redirect('/');
    // }
    // app.post("/auth", function(req, res) {
    //     var email = req.body.email;
    //     var password = req.body.password;
    //     if (email && password) {
    //         db.profiles.findOne({
    //             where: {
    //                 email: req.body.email,
    //                 password: req.body.password
    //             }
    //         }).then((results) => {
    //             if (results.length > 0) {
    //                 console.log(request.session.user)
    //                 request.session.loggedin = true;
    //                 request.session.id = results[0].id;
    //                 request.session.user = results[0];
    //                 res.redirect('/home');
    //             } else {
    //                 res.send('Incorrect Username and/or Password!');
    //             }
    //             res.end();
    //         })
    //     }
    //     //INSERT ELSE STATMENT IF USER DOES NOT PUT IN AN EMAIL OR PASSWORD!
    // });


// // Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//     // db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//     //   res.json(dbExample);
// });
// });