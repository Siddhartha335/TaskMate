import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { checkDatabaseConnection } from "./config/index.js";
const PORT:number = Number(process.env.PORT);
import { routeNotFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";
import passport from "passport";

const app = express();


//Check database connection
checkDatabaseConnection();

//cors
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001","https://sid-task-app.netlify.app"],
    methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
    credentials: true,
}));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());

app.get("/",(req,res)=> {
    res.send("Welcome to TaskMate Api");
})

app.use("/api",routes)

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});