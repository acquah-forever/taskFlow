import express from "express";
import { getTitle, createTitle, updateTitle, deleteTitle} from "../controllers/title"

const router = express.Router();

router.get('/', getTitle);
router.post('/', createTitle);
router.patch('/:id', updateTitle);
router.delete('/:id', deleteTitle);

export default router;