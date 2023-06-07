//const express = require("express");
import express from "express";

const app = express();
const PORT = 4000;
const urlLogger = (req, res, next) => {
    console.log(req.url);
    next();
};
const timeLogger = (req, res, next) => {
    const currentTime = Date.now();
    const currentDate = new Date(currentTime);
    const formattedDate = `${currentDate.getFullYear()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getDate()}`;

    console.log(`Time: ${formattedDate}`);
    next();
};
const secuLogger = (req, res, next) => {
    const protocol = req.protocol === "https" ? "secure" : "Insecure";
    console.log(protocol);
    next();
};
const protecLogger = (req, res, next) => {
    // /protected로 이동하려는 경우 이동하지 못하도록 처리
    if (req.url === "/protected") {
        res.status(403).send("Access forbidden");
    } else {
        next();
    }
};
app.use(urlLogger, timeLogger, secuLogger, protecLogger);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(process.env.PORT, () => `Listening!✅`);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);