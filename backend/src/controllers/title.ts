import Title from "../models/title";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getAuthenticatedUser:RequestHandler = async(req, res, next) => {
    try{
        const userId = req.session.userId;
        if(!userId){
            throw createHttpError(401, "User not authenticated")
        };
        const authenticatedUser = await Title.findById(userId).exec();
        if(!authenticatedUser){
            throw createHttpError(404, "User not found")
        };
        res.status(200).json(authenticatedUser)

    }
    catch(error){
        next(error)
    }
};


export const getTitle:RequestHandler = async(req, res, next) => {
    try{
        const title = await Title.find().exec();
        if(!title){
            throw createHttpError(404, "Board not found")
        };
        res.status(200).json(title)

    }
    catch(error){
        next(error)
    }
};

interface TitleValue {
    title: string,
    description: string
};

export const createTitle:RequestHandler<unknown, unknown, TitleValue, unknown> = async(req, res, next) => {
    try{
        const {title, description} = req.body;

        if(typeof title !== "string" || typeof description !== "string") {
            throw createHttpError(400, "Invalid Parameters")
        };
        const titleTrimmed = title.trim();
        const descriptionTrimmed = description.trim();

        if(!titleTrimmed || !descriptionTrimmed){
            throw createHttpError(400, "Invalid Parameters")
        }

    }
    catch(error){
        next(error)
    }

};