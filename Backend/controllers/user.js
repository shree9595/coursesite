const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    const { email } = req.body;

    user.save((err, user) => {
        if (err) {
            // return User.findOne({ email }, (err, user) => {
            //     res.json({ user: { _id, name, email, role } })
            // })
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email does not exists"
            });
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to front end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        });
    }
    next();
};


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    const { email } = req.body;
    console.log("email", email);
    User.findOneAndUpdate(
        { email },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                });
            }
            // user.salt = undefined;
            // user.encry_password = undefined;
            res.json(user.email);
        }
    );
};




exports.getRegister = (req, res) => {
    User.find(req.profile._id)
        // .populate("user", "_id name")
        .exec((err, add) => {
            if (err) {
                return res.status(400).json({
                    error: "NO address found",
                });
            }
            res.json(add);
        });
};

exports.pushRegister = (req, res) => {
    let purchases = [req.body];
    console.log(req.profile._id);
    console.log(req.body);


    // req.body.order.address.forEach(address => {
    //     purchases.push({
    //         fullname: address.fullname,
    //         address: address.address,
    //         pin: address.pin,
    //         contact: address.contact,
    //         state: address.state,
    //         city: address.city,
    //     });
    // });

    // store thi in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { register: purchases } },
        { new: false },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            res.json(purchases)
        }
    );
};



// exports.getCity = (req, res) => {

//     User.find({ name: "ram" }, { name:1,_id:0})
//         // .populate("role")
//         .exec((err, add) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: "NO address found",
//                 });
//             }
//             res.json(add);
//         });
// };
