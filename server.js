const express = require("express");
const server = express();
const PORT = 2456;
const userRouter = require("./Routes/userRoute.js");
const connectDB = require("./Utils/db.js");
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5174",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}

server.use(cors(corsOptions));
server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello from homepage!");
})

connectDB("mongodb://127.0.0.1:27017/auth")
.then(() => {
    console.log("Database Connected Successfully!");
})
.catch((err) => {
    console.log("Database connection error : ", err);
})

server.use(express.urlencoded({extended: false}));

server.use("/auth", userRouter);

server.listen(PORT, (err) => {
    if(!err){
        console.log(`Backend server is running on port ${PORT}`);
    }
    else{
        console.log("Encountered with an error while running server : ", err);
    }
})
