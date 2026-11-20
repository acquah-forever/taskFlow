import Users from '../models/users';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt';
import { signupSchema,loginSchema, SignupInput, LoginInput} from "../validations/users"
import { Types } from "mongoose";
import { ZodError } from 'zod';


function userResponse(user: { _id: Types.ObjectId, username: string, email: string }) {
    return {
        _id: user._id.toString(),
        username: user.username,
        email: user.email
    }

};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }

        const getUser = await Users.findById(authenticatedUser).select("+email").exec();

        if (!getUser) {
            throw createHttpError(404, "User not found");
        }

        res.status(200).json(userResponse(getUser));

    }
    catch (error) {
        next(error)
    }

};


export const signup: RequestHandler<unknown, unknown, SignupInput, unknown> = async (req, res, next) => {
    try {
        const validation = signupSchema.parse(req.body);
        const {username, email, password: passwordRaw} = validation

        const existingUsername = await Users.exists({ username: username })
        if (existingUsername) {
            throw createHttpError(409, "Username already exists")
        }

        const existingEmail = await Users.exists({ email: email })
        if (existingEmail) {
            throw createHttpError(409, "Email already exists")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 12)

        const newUser = await Users.create({
            username,
            email,
            password: passwordHashed

        })

        req.session.regenerate((error) => {
            if (error) {
                return next(error);
            }
            req.session.userId = newUser._id.toString();

            req.session.save((error) => {
                if(error) {
                    return next(error)
                }
                res.status(200).json(userResponse(newUser));
            });
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400,{
                message: "Invalid data",
                errors: error.issues
            })
        }
        return next(error)
    }
}


export const login: RequestHandler<unknown, unknown, LoginInput, unknown> = async (req, res, next) => {
    try {
        const validation = loginSchema.parse(req.body);
        const { username, password:passwordRaw } = validation;

        const user = await Users.findOne({ username }).select("+username +password").exec()
        if (!user) {
            throw createHttpError(401, "Invalid Credentials")
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password)
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid Credentials")
        }

        req.session.regenerate((error) => {
            if (error) {
                return next(error)
            }

            req.session.userId = user._id.toString()
        })

        req.session.save((error) => {
            if(error) {
                return next(error)
            }
            res.status(200).json(userResponse(user))
        })

    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400,{
                message: "Invalid data",
                errors: error.issues

            })
        }
        return next(error)
    }

}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({ message: "Logged out successfully" })
        }
    })
}