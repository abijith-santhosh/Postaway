import ApplicationError from "../../../middlewares/applicationError.middleware.js";
import CommentModel from "../models/comment.model.js";

export default class CommentController{
    //Get comments by id
    getComments(req,res,next){
        try {
            const postId = req.params.id;
            const comments = CommentModel.get(postId);
            res.status(200).send(comments);
        } catch (error) {
            next(error);
        }
    }

    //Add comments by id
    addComments(req, res, next) {
        const userId = req.userId;
        const postId = req.params.id;
        const { content } = req.body;
        try {
            const newComment = CommentModel.addComment(userId, Number(postId), content);
            res.status(201).send("Comments Added to The Post");
        } catch (error) {
            next(error);
        }
    }

    //Update comments by id
    updateComments(req, res, next) {
        const id = req.params.id;
        const userId = req.userId;
        const { postId, content } = req.body;
        try {
            const updatedPost = CommentModel.update(Number(id), userId, Number(postId), content);
            res.status(200).json(updatedPost);
        } catch (error) {
            next(error)
        }
    }


    //Delete comments by id
    deleteComments(req, res, next) {
        const postId = req.params.id;
        const userId = req.userId;

        try {
            CommentModel.remove(postId, userId);
            return res.status(200).send("Comment is Deleted");
        } catch (error) {
            next(error);
        }
    }

    //Pagination comments
    paginationComments(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = parseInt(req.query.limit) || 10; // Default limit of 10 posts per page
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const posts = CommentModel.getAll();
            const paginatedComments = posts.slice(startIndex, endIndex);
            if (paginatedComments.length === 0) {
                throw new ApplicationError("No posts available for the specified page", 404);
            }

            res.status(200).json({currentPage: page,totalPages: Math.ceil(posts.length / limit), posts: paginatedComments});
        } catch (error) {
            next(error);
        }
    }


}