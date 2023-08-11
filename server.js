import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as userRouter } from "./routes/authRouter.js";
import { activityRouter } from "./routes/activity-router.js";
import { connectionDB } from "./config/database-connection.js";
import  {googleRouter } from './routes/googleLogin.js'
import {provRouter} from './routes/providerRouts.js'
import session from 'express-session';
import passport from 'passport';
import { paymentRouter } from "./routes/payment-router.js";



dotenv.config();

connectionDB();
const port = process.env.PORT;
const app = express();
app.use(session({secret : "anything"}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/activity", activityRouter);

app.use("/users", userRouter);
app.use("/payment" , paymentRouter);






app.use("/auth/google" , googleRouter)
app.use("/providers" , provRouter)

app.listen(port, () => {
  console.log(`listining to localHost port ${port}`);
});
