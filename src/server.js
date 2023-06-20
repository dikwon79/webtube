//const express = require("express");
import "./db";
import "./models/Video"
import express from "express";
import morgan from "morgan";
import global from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();


// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// }

const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views");

app.use(express.urlencoded({
    extended: true
}));
app.use("/", global);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);