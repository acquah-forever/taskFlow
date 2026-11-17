import express from "express";
import { getProfile, createProfile, updatedProfile } from '../controllers/profile';

const router = express.Router();

router.get('/', getProfile);
router.post('/', createProfile);
router.patch('/:id', updatedProfile);


export default router;