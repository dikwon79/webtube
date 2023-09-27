import express from "express";
import morgan from "morgan";


const app = express();
const PORT = 4000;

const logger = morgan("dev");
//const logger = morgan("combined");


app.use(logger);


const globalRouter = express.Router();

const handleHome = (req, res) => res.send("home");

globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit user");
userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Wahtch Video");
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);



const handleListening = () => console.log(`Server listineing on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);



