import express from "express";

const app = express();
const PORT = 4000;


const handleHome = (req, res) => {
    return res.send("I love you");
};
const handleLogin = (req, res) => {
    return res.send("Login here.");
};
app.get("/", handleHome);
app.get("/login", handleLogin);



const handleListening = () => console.log(`Server listineing on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);



