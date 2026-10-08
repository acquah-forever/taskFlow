import express from 'express'
import {Request, Response, NextFunction} from "express"
import createHttpError, { isHttpError } from 'http-errors'
import mongoose from "mongoose";


const app = express()

app.use(express.json())

app.get("/", (req, res) => {
 res.json({
   message: "Backend is running"
 });
});

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"))
})

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