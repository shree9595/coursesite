const express = require("express")
const { check } = require("express-validator")
const { signup, signin,signout, isAdmin, isSignedIn, getUser, updateUser, isAuthenticated, pushRegister, getRegister, getUserById } = require("../controllers/user")
const router = express.Router()



router.param("userId", getUserById);


router.post("/signup",
    [
        check("name", "name field is required").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 3 })
    ],
    signup)
router.post("/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 1 })
    ],
    signin)


router.post(
    "/getRegister/:userId",
    isSignedIn,
    isAuthenticated,
    pushRegister
);

router.get(
    "/Myregister/:userId",
    isSignedIn,
    isAuthenticated,
    getRegister
);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/signout",signout);
router.put("/updateuser/:userId", isSignedIn, isAuthenticated, updateUser);



module.exports = router