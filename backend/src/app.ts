import "dotenv/config";
import express from 'express'
import session from "express-session";
import {Request, Response, NextFunction} from "express"
import usersRouter from './routes/users'
import createHttpError, { isHttpError } from 'http-errors'
import env from "./util/validateEnv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express()

app.set("trust proxy", 1);

app.use(express.json())

app.get("/", (req, res) => {
 res.json({
   message: "Backend is running"
 });
});

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"))
})

app.use(session({
  name: "sessionId",
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
  rolling: true, // Reset the cookie expiration time on every request

  // where session data will be stored
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING,
    collectionName: "sessions",
  }),
}));

app.use("/api/users", usersRouter)

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (isHttpError(error)) {
    return res.status(error.status).json({
      error: error.message,
    });
  }


  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
});



export default app