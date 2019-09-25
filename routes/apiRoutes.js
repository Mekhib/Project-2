var db = require("../models");

module.exports = function(app) {

        // function isAuthenticated(req, res, next) {
        //     if (req.session.loggedin) {
        //         return next();
        //     }
        //     res.redirect('/');
        // }
        var userid
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
                        // console.log(results.id)
                        var userid = results.id
                        req.session.loggedin = true;
                        req.session.id = results.id;
                        req.session.user = results;
                        // console.log(req.session);
                        userid = req.session.user.id;
                        res.json(req.session.user);
                    } else {
                        res.send('Incorrect Username and/or Password!');
                    }

                })

            }
            //INSERT ELSE STATMENT IF USER DOES NOT PUT IN AN EMAIL OR PASSWORD!
        });

        app.post("/signupinfo", function(req, res) {
            // console.log(req.body);
            // console.log(req.body.password)
            db.profiles.create({
                    email: req.body.email,
                    first_name: req.body.firstName,
                    last_name: req.body.lastname,
                    Password: req.body.password
                        //Password is not being inserted into database! find out why!
                })
                .then(function(dbPost) {
                    res.json(dbPost);
                });
        });
        app.post("/searchresults", function(req, res) {
            db.profiles.findAll({
                    where: {
                        email: req.body.email
                    }
                })
                .then(function(response) {
                    res.json(response)
                })
        })
        app.post("/userpage", function(req, res) {

            // console.log(req.body);
            db.profiles.findOne({
                where: {
                    id: req.body.id
                }
            }).then(function(response) {
                res.json(response);
            })

        })
        app.get("/redirect", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/userpage.html"))

        })
        app.post("/sendfriendrequest", function(req, res) {
            // console.log(req.session.user)
            db.request.create({
                requester: req.session.user.id,
                recipient: req.body.recipient
            }).then(function(response) {
                res.send("success");
            })
        })
        app.post("/friendrequests", function(req, res) {
            // console.log("user id", req.session.user.id)
            db.request.findAll({
                where: {
                    recipient: req.session.user.id
                }
            }).then((friendRequests => {
                return friendRequests.map((requester) => requester.id)
            })).then((ids) => {
                db.profiles.findAll({
                    where: {
                        id: ids
                    }
                }).then(profiles => res.json(profiles))
            })


        })
        app.post("/requestedfriends", function(req, res) {
            db.request.findAll({
                where: {
                    requester: req.session.user.id
                }
            }).then((friendRequests => {
                return friendRequests.map((requester) => requester.id)
            })).then((ids) => {
                db.profiles.findAll({
                    where: {
                        id: ids
                    }
                }).then(profiles => res.json(profiles))
            })

        })
        app.post("/acceptedfriends", function(req, res) {
            db.friends.create({
                friend1: req.body.id,
                friend2: req.session.user.id
            }).then(function(response) {
                console.log(response);
            })
            db.friends.create({
                friend1: req.session.user.id,
                friend2: req.body.id
            }).then(function(response) {
                console.log(response);
            })
            res.send("success")
        })
        app.post("/all", function(req, res) {
            db.friends.findAll({
                where: {
                    friend1: req.session.user.id
                }
            }).then((allfriends => {
                return allfriends.map((list) => list.id)
            })).then((ids) => {
                db.profiles.findAll({
                    where: {
                        id: ids
                    }
                }).then(profiles => res.json(profiles))
            })
        })
        app.post("/all2", function(req, res) {
            db.friends.findAll({
                where: {
                    friend2: req.session.user.id
                }
            }).then((allfriends => {
                return allfriends.map((list) => list.id)
            })).then((ids) => {
                db.profiles.findAll({
                    where: {
                        id: ids
                    }
                }).then(profiles => res.json(profiles))
            })
        })
    }
    // function isAuthenticated(req, res, next) {
    //     if (req.session.loggedin) {
    //         return next();
    //     }
    //     res.redirect('/');
    //  }
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