import express from 'express';
import CommentController from '../controllers/comment.controller.js';

const commentRouter = express.Router();

const commentController = new CommentController();


commentRouter.get('/:id', commentController.getComments);
commentRouter.post("/:id",commentController.addComments);
commentRouter.put("/:id",commentController.updateComments);
commentRouter.delete("/:id",commentController.deleteComments);

commentRouter.get("/pages/:id",commentController.paginationComments);

export default commentRouter;

