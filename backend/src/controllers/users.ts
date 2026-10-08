import Users from '../models/users';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'


function userResponse(user: { userName: string, password: string }) {
    return {
        username: user.userName,
        password: user.password
    }

};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;

        if (!authenticatedUser) {
            throw createHttpError(404, "User not authenticated");
        }

        const getUser = await Users.findById(authenticatedUser).select("+email").exec();

        if (!getUser) {
            throw createHttpError(401, "User not found");
        }

        res.status(200).json(userResponse(getUser));

    }
    catch (error) {
        next(error)
    }

};

interface SignUp {
    userName: string,
    email: string,
    password: string
}

export const signup: RequestHandler<unknown, unknown, SignUp, unknown> = async (req, res, next) => {
    try {

        const { userName, email, password: passwordRaw } = req.body

        if (typeof userName !== 'string' || typeof email !== 'string' || typeof passwordRaw !== 'string') {
            throw createHttpError(400, "Invalid Parameters")
        }

        const userNameTrimmed = userName.trim()
        const emailTrimmed = email.trim()
        const password = passwordRaw


        if (!userNameTrimmed || !emailTrimmed) {
            throw createHttpError(400, "Parameters Missing")
        }

        if (userNameTrimmed.length > 20) {
            throw createHttpError(400, "Username is too lengthy")
        }

        if (emailTrimmed.length > 20) {
            throw createHttpError(400, "Email is too lenghty")
        }

        if (!password || password.length > 128) {
            throw createHttpError(400, "Password is too long")
        }

        const existingUserName = await Users.exists({ userName: userNameTrimmed })
        if (existingUserName) {
            throw createHttpError(404, "Username already exists")
        }

        const existingEmail = await Users.exists({ emai: emailTrimmed })
        if (existingEmail) {
            throw createHttpError(404, "Email already exists")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 12)

        const newUser = await Users.create({
            userName: userNameTrimmed,
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
    userName: string,
    password: string
}

export const login: RequestHandler<unknown, unknown, LogIn, unknown> = async (req, res, next) => {
    try {

        const { userName, password: passwordRaw } = req.body

        if (typeof userName !== "string" || typeof passwordRaw !== "string") {
            throw createHttpError(400, "Invalid Parameters")
        }

        const userNameTrimmed = userName.trim()
        const password = passwordRaw

        if (!userNameTrimmed || !password) {
            throw (createHttpError(400, "Parameters missing"))
        }

        const existingUserName = await Users.findById(userNameTrimmed).select("+email +password").exec()
        if (!existingUserName) {
            throw createHttpError(401, "Invalid Parameters")
        }

        const passwordMatch = await bcrypt.compare(password, existingUserName.password)
        if (!passwordMatch) {
            throw createHttpError(404, "Invalid Parameters")
        }

        req.session.regenerate((error) => {
            if (error) {
                return next(error)
            }

            req.session.userId = existingUserName._id.toString()
        })

        req.session.save((error) => {
            if (error) {
                return next(error)
            }

            res.status(200).json(userResponse(existingUserName))
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
            res.status(201).json({ message: "Logged out" })
        }
    })
}