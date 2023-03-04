import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import pollRouter from "./routers/pollRouter.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/polls", pollRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server is up, this port : ${PORT}`);
    mongoose.set("strictQuery",false);
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log(err)
    })
})