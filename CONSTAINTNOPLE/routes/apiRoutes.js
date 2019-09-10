var db = require("../models");

module.exports = function(app) {
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
}

// // Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//     // db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//     //   res.json(dbExample);
// });
// });