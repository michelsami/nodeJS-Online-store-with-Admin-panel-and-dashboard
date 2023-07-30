import express, { json } from "express";
import { router as userRouter } from "./routes/userRouter.js";
import dotenv from 'dotenv'

const app = express();
app.use(json());
dotenv.config()
const port = process.env.PORT;

app.use("/users", userRouter);
// app.use("/category", categoryRouter);
// app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
