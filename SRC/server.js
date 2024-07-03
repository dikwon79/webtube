import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.end();
}

app.get("/", handleHome);

const handleListening = () =>
    console.log(`server listening on port http://localhost:${porst}`);

app.listen(PORT, handleListening);