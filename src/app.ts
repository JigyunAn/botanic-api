import "dotenv/config";
import router from "./routes";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "../ormconfig";
import { createConnection } from "typeorm";

const app = express();

createConnection(config)
  .then(() => {
    console.log("DB CONNECTION!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.get("/", async (req: Request, res: Response) => {
  res.send("TEST");
});
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ msg: "404 route not found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  return res.status(500).json({
    message: "Error",
  });
});

app.listen(8080, () => {
  console.log("start");
});
