const Course = require("../models/course");
const { check, validationResult } = require("express-validator");



exports.addCourse = (req, res) => {

    console.log(req.body);
    const course = new Course(req.body);
    course.save((err, course) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }
        res.json({ course });
    });
};


exports.getAllCourse = (req, res) => {
    Course.find()
        .exec((err, course) => {
            if (err) {
                return res.status(400).json({
                    error: "NO getAllCourse found",
                });
            }
            res.json(course);
        });
};

