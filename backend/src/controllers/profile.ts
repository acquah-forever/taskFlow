import Profile from "../models/profile";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { ProfileInput } from "../validations/profile";
import { ZodError } from "zod";
import mongoose from "mongoose";