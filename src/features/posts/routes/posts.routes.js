import express from 'express';
import {upload} from '../../../middlewares/fileupload.middleware.js';
import {addPostValidate} from '../../../middlewares/validation.middleware.js';

import PostsController from '../controllers/posts.controller.js';

const postsRouter = express.Router();

const postsController = new PostsController();

postsRouter.get('/all', postsController.getPosts);
postsRouter.post('/',upload.single("imageUrl"),addPostValidate, postsController.addPost);

postsRouter.get('/:id', postsController.getPost);
postsRouter.put("/:id",upload.single("imageUrl"),addPostValidate,postsController.updatePost);

postsRouter.delete("/:id", postsController.deletePost);
postsRouter.get("/", postsController.getUserPost);

//Additional tasks
postsRouter.get("/filter", postsController.filterPosts);
postsRouter.post("/:postId/save", postsController.savePosts);
postsRouter.put("/:postId/archieve", postsController.archivePost);
postsRouter.post("/:postId/bookmark", postsController.bookmarkPost);

export default postsRouter;