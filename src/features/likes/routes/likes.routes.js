import express from 'express';
import LikesController from '../controllers/likes.controller.js';

const likesRouter = express.Router();

const likesController = new LikesController();

likesRouter.post("/:id", likesController.addLikes);
likesRouter.get("/:id", likesController.getAllLikes);

export default likesRouter;