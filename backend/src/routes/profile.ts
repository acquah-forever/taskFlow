import express from "express";
import { getProfile, createProfile, updateProfile } from '../controllers/Profile';

const router = express.Router;

router.get('/', getProfile);
router.post('/', createProfile);
router.post('/:id', updateProfile);

export default router;