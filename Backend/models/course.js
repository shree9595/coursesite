var mongoose = require("mongoose");


var courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        courseDept: {
            type: String,

        },
        description: {
            type: String,
            maxlength: 2000
        },
        room: {
            type: String
        },
        waitlistCapacity: {
            type: String,
        },
        courseTeam: {
            type: String,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);

