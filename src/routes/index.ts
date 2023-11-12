import express from "express";
import userRouter from "./user.router";

const app = express();

app.use("/user", userRouter);

export default app;
