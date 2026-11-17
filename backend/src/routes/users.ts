import express from 'express';
import rateLimit from "express-rate-limit";
import { getAuthenticatedUser, signup, login, logout } from '../controllers/users';

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit:5,
    message: {
        message: "Too many attempts. Please try again later"
    },
});

router.get('/', getAuthenticatedUser);
router.post('/signup', signup);
router.post('/login', authLimiter, login);
router.post('/logout', logout);


export default router