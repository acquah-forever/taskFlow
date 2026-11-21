import Title from "../models/title";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { titlesSchema, TitleInput } from "../validations/title";
import { ZodError } from "zod";


export const getTitle: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const title = await Title.find({ user: authenticatedUser }).exec();
        
        res.status(200).json(title)

    }
    catch (error) {
        next(error)
    }
};


export const createTitle: RequestHandler<unknown, unknown, TitleInput, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const validateData = titlesSchema.parse(req.body);



        const newTitle = await Title.create({user: authenticatedUser,...validateData});

        res.status(201).json(newTitle);
    }
    catch (error) {
        if (error instanceof ZodError) {
            return next(createHttpError(400, {
                message: "Invalid data",
                errors: error.issues
            }))
        }
        next(error)
    }

};

interface UpdateTitle extends Partial<TitleInput> { }

export const updateTitle: RequestHandler<{ id: string }, unknown, UpdateTitle, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const validateData = titlesSchema.parse(req.body);

        const titleId = req.params.id

        if (!mongoose.isValidObjectId(titleId)) {
            throw createHttpError(400, "Invalid title id")
        }

        const updatedTitle = await Title.findOneAndUpdate(
            {
                _id: titleId,
                user: authenticatedUser
            },
            {
                $set: validateData
            },
            {
                new: true,
                runValidators: true
            }
        ).exec();


        if (!updatedTitle) {
            throw createHttpError(404, "Board not found")
        }

        res.status(200).json(updatedTitle)

    }
    catch (error) {
        if (error instanceof ZodError) {
                    return next(createHttpError(400, {
                        message: "Invalid data",
                        errors: error.issues
                    }));
        next(error)
    }
};



export const deleteTitle: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }

        const titleId = req.params.id
        if (!mongoose.isValidObjectId(titleId)) {
            throw createHttpError(400, "Invalid title id")
        }

        const deletedTitle = await Title.findOneAndDelete({ _id: titleId, user: authenticatedUser });

        if (!deletedTitle) {
            throw createHttpError(404, "Title not found");
        }

        res.status(200).json({message: "Title deleted successfully"});
    }

    catch (error) {
        next(error);
    }
}
}
