
require("dotenv").config();
const express = require('express')

const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()


//my routes
const userRouter = require("./routers/user")
const courseRouter = require("./routers/course")


//Mongoose connection

mongoose
    .connect(
        "mongodb://DotData:D0bj2G1CLll131oi@cluster0-shard-00-00-ruo3z.mongodb.net:27017,cluster0-shard-00-01-ruo3z.mongodb.net:27017,cluster0-shard-00-02-ruo3z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log("db connected");
    });


//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use("/api", userRouter)
app.use("/api", courseRouter)



app.get("/", (req, res) => {
    res.send("BackEnd Ready")
})



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("We are listening port 8080");
})