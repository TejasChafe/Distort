import express from 'express';
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', authenticate, createComment);
router.put('/:id', authenticate, updateComment);
router.delete('/:id', authenticate, deleteComment);

export default router;