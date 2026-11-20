
import Profile from "../models/profile";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { profileSchema, updateProfileSchema, ProfileInput } from "../validations/profile";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const getProfile: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }

        const profile = await Profile.findOne({user: authenticatedUser}).exec();

        if (!profile) {
            throw createHttpError(404, "Profile not found");
        }

        res.status(200).json(profile);

    } catch (error) {
        next(error);
    }
};

export const createProfile: RequestHandler<unknown, unknown, ProfileInput, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }

        const validatedData = profileSchema.parse(req.body);

        const existingProfile = await Profile.exists({user: authenticatedUser});

        if (existingProfile) {
            throw createHttpError(409, "Profile already exists");
        }

        const newProfile = await Profile.create({user: authenticatedUser,...validatedData});

        res.status(201).json(newProfile);

    } 
    
    catch (error) {
        if (error instanceof ZodError) {
            return next(createHttpError(400, {
                message: "Invalid data",
                errors: error.issues
            }));
        }

        if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
            return next(createHttpError(409, "Profile already exists"));
        }

        next(error);
    }
};

export const updatedProfile: RequestHandler<{ id: string }, unknown, Partial<ProfileInput>, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }

        const profileId = req.params.id;

        if (!mongoose.isValidObjectId(profileId)) {
            throw createHttpError(400, "Invalid profile ID");
        }

        const validatedData = updateProfileSchema.parse(req.body);

        if (Object.keys(validatedData).length === 0) {
            throw createHttpError(400, "Provide at least one field to update");
        }

        const updatedProfile = await Profile.findOneAndUpdate(
            {
                _id: profileId,
                user: authenticatedUser
            },
            {
                $set: validatedData
            },
            {
                new: true,
                runValidators: true
            }
        ).exec();

        if (!updatedProfile) {
            throw createHttpError(404, "Unable to update profile");
        }

        res.status(200).json(updatedProfile);

    } catch (error) {
        if (error instanceof ZodError) {
            return next(createHttpError(400, {
                message: "Invalid data",
                errors: error.issues
            }));
        }

        next(error);
    }
};
