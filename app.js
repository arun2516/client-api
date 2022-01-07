require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");




const port = process.env.PORT || 3000




//load routers
const userrouter = require("./src/routers/user.router");
const ticketrouter = require("./src/routers/ticket.router");

//API security
// app.use(helmet());

// handle CORS
app.use(cors());

//MongoDb connection setup
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

if(process.env.NODE_ENV !== "production"){
    const db = mongoose.connection;
    db.on("open",()=>{
        console.log("mongodb is connected")
    });
    db.on("error",(error)=>{
        console.log(error)
    });

    // Logger
app.use(morgan("tiny"));
}





//set parsing
app.use(express.json());


// routers

app.use("/v1/user",userrouter);
app.use("/v1/ticket" , ticketrouter);

//error handler
const handleerror = require("./src/routers/utils/errorhandler")

// error handling using error handler
app.use((req,res,next)=>{
    const error = new Error("resources not found")
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
handleerror(error,res);
})




app.listen(port,()=>{
    console.log(`API is ready on http://localhost:${port}`);
});