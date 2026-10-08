import express from 'express';
import { getAuthenticatedUser, signup, login } from '../controllers/users';

const router = express.Router();

router.use('/', getAuthenticatedUser);
router.use('/signup', signup);
router.use('/login', login);

