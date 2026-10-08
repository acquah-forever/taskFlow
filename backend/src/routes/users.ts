import express from 'express';
import { getAuthenticatedUsers, signup, login, logout} from '../controllers/users';

const router = express.Router();

router.use('/', getAuthenticatedUsers);
router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
