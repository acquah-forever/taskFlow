import Title from "../models/title";
import Users from "../models/users";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { titlesSchema } from "../validations/title";
import { ZodError } from "zod";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };
        const existingUser = await Users.findOne({ user: authenticatedUser }).exec();
        if (!existingUser) {
            throw createHttpError(404, "User not found")
        };
        res.status(200).json(authenticatedUser)

    }
    catch (error) {
        next(error)
    }
};


export const getTitle: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const title = await Title.find({ user: authenticatedUser }).exec();
        if (!title) {
            throw createHttpError(404, "Board not found")
        };
        res.status(200).json(title)

    }
    catch (error) {
        next(error)
    }
};

interface TitleValue {
    title: string,
    description: string
};

export const createTitle: RequestHandler<unknown, unknown, TitleValue, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const validateData = titlesSchema.parse(req.body);

        const { title, description } = validateData;

        // const { title, description } = req.body;

        // if (typeof title !== "string" || typeof description !== "string") {
        //     throw createHttpError(400, "Invalid Parameters")
        // };
        // const titleTrimmed = title.trim();
        // const descriptionTrimmed = description.trim();

        // if (!titleTrimmed || !descriptionTrimmed) {
        //     throw createHttpError(400, "Invalid Parameters")
        // };

        const newTitle = await Title.create({
            user: authenticatedUser,
            title,
            description
        });

        res.status(201).json(newTitle);
    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400, "Invalid data")
        }
        next(error)
    }

};

interface UpdateTitle extends Partial<TitleValue> { }

export const updateTitle: RequestHandler<{ id: string }, unknown, UpdateTitle, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const validateData = titlesSchema.parse(req.body);

        const { title, description } = validateData;

        // const { title, description } = req.body;

        // if (typeof title !== "string" || typeof description !== "string") {
        //     throw createHttpError(400, "Invalid Parameters")
        // };
        // const titleTrimmed = title.trim();
        // const descriptionTrimmed = description.trim();

        // if (!titleTrimmed || !descriptionTrimmed) {
        //     throw createHttpError(400, "Invalid Parameters")
        // };

        const titleId = req.params.id

        if (!mongoose.isValidObjectId(titleId)) {
            throw createHttpError(400, "Invalid title id")
        }

        const updatedTitle = await Title.findOneAndUpdate({ _id: titleId, user: authenticatedUser }, {
            title,
            description
        },
            {
                new: true,
                runValidators: true
            }).exec()

        if (!updatedTitle) {
            throw createHttpError(404, "Board not found")
        }

        res.status(200).json(updatedTitle)

    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400, "Invalid data")
        }
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

        res.status(200).json({
            message: "Title deleted successfully",
        });
    }

    catch (error) {
        next(error);
    }
};

