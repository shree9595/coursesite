var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");


// var wishlist = new mongoose.Schema({

//   product_wishlist_id: String,
// })

var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        lastname: {
            type: String,
            maxlength: 32,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        contact: {
            type: Number,
            maxlength: 10,
            trim: true
        },
        aboutME: {
            type: String,


        },
        city: {
            type: String,

        },
        country: {
            type: String,

        },
        company: {
            type: String,

        },
        school: {
            type: String,

        },
        hometown: {
            type: String,

        },
        waitlist: {
            type: String,

        },
        courseTeam: {
            type: String,

        },




        encry_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        register: {
            type: Array,
            default: []
        },
       
    },
    { timestamps: true }
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    autheticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
