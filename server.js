import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as userRouter } from "./routes/authRouter.js";
import { activityRouter } from "./routes/activity-router.js";
import { connectionDB } from "./config/database-connection.js";
import {googleRouter} from './routes/googleAuth.js'

dotenv.config();

connectionDB();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/activity", activityRouter);

app.use("/users", userRouter);
app.use("/" , googleRouter)
app.listen(port, () => {
  console.log(`listining to localHost port ${port}`);
});
