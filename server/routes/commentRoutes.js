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


// import express from 'express';
// import { 
//   addComment, 
//   getComments, 
//   deleteComment 
// } from '../controllers/commentController.js';
// import userAuth from '../middlewares/auth.js';

// const router = express.Router();

// router.post('/', userAuth, addComment);
// router.get('/', getComments);
// router.delete('/', userAuth, deleteComment);

// export default router;