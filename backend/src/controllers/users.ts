import Users from '../models/users';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'


function userResponse(user: { username: string, email: string }) {
    return {
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

interface SignUp {
    username: string,
    email: string,
    password: string
}

export const signup: RequestHandler<unknown, unknown, SignUp, unknown> = async (req, res, next) => {
    try {

        const { username, email, password: passwordRaw } = req.body

        if (typeof username !== 'string' || typeof email !== 'string' || typeof passwordRaw !== 'string') {
            throw createHttpError(400, "Invalid Parameters")
        }

        const usernameTrimmed = username    .trim()
        const emailTrimmed = email.trim()
        const password = passwordRaw


        if (!usernameTrimmed || !emailTrimmed || !password) {
            throw createHttpError(400, "Parameters Missing")
        }

        if (usernameTrimmed.length > 50) {
            throw createHttpError(400, "Username is too lengthy")
        }

        if (emailTrimmed.length > 50) {
            throw createHttpError(400, "Email is too lenghty")
        }

        if (!password || password.length > 128) {
            throw createHttpError(400, "Password is too long")
        }

        const existingUsername = await Users.exists({ username: usernameTrimmed })
        if (existingUsername) {
            throw createHttpError(409, "Username already exists")
        }

        const existingEmail = await Users.exists({ email: emailTrimmed })
        if (existingEmail) {
            throw createHttpError(409, "Email already exists")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 12)

        const newUser = await Users.create({
            username: usernameTrimmed,
            email: emailTrimmed,
            password: passwordHashed

        })

        req.session.regenerate((error) => {
            if (error) {
                return next(error);
            }
            req.session.userId = newUser._id.toString();

            req.session.save((error) => {
                if (error) {
                    return next(error);
                }
                res.status(200).json(userResponse(newUser));
            });
        });
    }
    catch (error) {
        return next(error)
    }
}

interface LogIn {
    username: string,
    password: string
}

export const login: RequestHandler<unknown, unknown, LogIn, unknown> = async (req, res, next) => {
    try {

        const { username, password: passwordRaw } = req.body

        if (typeof username !== "string" || typeof passwordRaw !== "string") {
            throw createHttpError(400, "Invalid Parameters")
        }

        const usernameTrimmed = username.trim()
        const password = passwordRaw

        if (!usernameTrimmed || !password) {
            throw (createHttpError(400, "Parameters missing"))
        }

        const existingUser = await Users.findOne({ username: usernameTrimmed }).select("+username +password").exec()
        if (!existingUser) {
            throw createHttpError(401, "Invalid Credentials")
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid Credentials")
        }

        req.session.regenerate((error) => {
            if (error) {
                return next(error)
            }

            req.session.userId = existingUser._id.toString()
        })

        req.session.save((error) => {
            if (error) {
                return next(error)
            }

            res.status(200).json(userResponse(existingUser))
        })

    }
    catch (error) {
        next(error)
    }

}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error)
        } else {
            res.status(201).json({ message: "Logged out successfully" })
        }
    })
}