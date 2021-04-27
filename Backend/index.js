
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
mongoose.connect("mongodb://localhost:27017/Companyproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB connected");
})

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use("/api", userRouter)
app.use("/api", courseRouter)



app.get("/", (req, res) => {
    res.send("BackEnd Ready")
})



const port = 9595
app.listen(port, () => {
    console.log("We are listening port 9595");
})