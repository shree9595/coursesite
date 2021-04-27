const express = require("express")

const { addCourse, getAllCourse } = require("../controllers/course");
const { getUserById, isSignedIn, isAuthenticated, isAdmin } = require("../controllers/user");



const router = express.Router()

router.param("userId", getUserById);


// router.post("/addCourse/:userId",
//     // isSignedIn,
//     // isAuthenticated,
//     // isAdmin,
//     addCourse)

router.post("/addCourse/:userId", addCourse);
router.get("/getAllCourse", getAllCourse);


module.exports = router