import Profile from "../models/profile";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { profileSchema } from "../validations/profile";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };
        const existingUser = await Profile.findOne({ user: authenticatedUser }).exec()
        if (!existingUser) {
            throw createHttpError(404, "User not found")
        };
        res.status(200).json(authenticatedUser)

    }
    catch (error) {
        next(error)
    };
};

export const getProfile: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const profile = await Profile.find({ user: authenticatedUser }).exec();
        if (!profile) {
            throw createHttpError(400, "Profile not found")
        }
        res.status(200).json(profile)

    }
    catch (error) {
        next(error)
    }

}

interface ProfileValue {
    position: string,
    bio: string
}

export const createProfile: RequestHandler<unknown, unknown, ProfileValue, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const validatedData = profileSchema.parse(req.body);
        const { position, bio } = validatedData;

        const newProfile = await Profile.create({
            user: authenticatedUser,
            position,
            bio
        })

        res.status(201).json(newProfile)

    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400, "Invalid data")
        }
        next(error)
    }
};

interface UpdateValue extends Partial<ProfileValue> { };

export const updatedProfile: RequestHandler<{ id: string }, unknown, UpdateValue, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        };

        const validatedData = profileSchema.parse(req.body);
        const { position, bio } = validatedData;

        const profileId = req.params.id;
        if (mongoose.isValidObjectId(profileId)) {
            throw createHttpError(400, "Invalid id")
        };

        const updatedProfile = await Profile.findOneAndUpdate({ _id: profileId, user: authenticatedUser }, {
            position,
            bio
        },
            {
                new: true,
                runValidators: true
            }).exec()

        if (!updatedProfile) {
            throw createHttpError(404, "Profile not found")
        }

        res.status(200).json(updatedProfile)

    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400, "Invalid data")
        }

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000
        ) {
            return res.status(409).json({
                error: "A record with a unique field already exists.",
            });
        }
        next(error)
    }
};

