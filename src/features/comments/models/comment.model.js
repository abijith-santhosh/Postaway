import PostsModel from "../../posts/models/posts.model.js";
import ApplicationError from "../../../middlewares/applicationError.middleware.js";

export default class CommentModel{
    constructor(id,userId,postId,content) {
        this.id=id;
        this.userId=userId;
        this.postId=postId;
        this.content=content;
    }

    //Get all comments
    static getAll(){
        return comments;
    }

    //Get all comments by postId
    static get(postId){
        const getComments = comments.filter(comment => comment.postId === postId);
        if(getComments.length === 0){
            throw new ApplicationError("No comments found", 404);
        }
        return getComments;
    }

    //Add comments to the post
    static addComment(userId,postId,content){
        const post = PostsModel.getAllPosts().find((post)=>post.id == postId);
        if(!post){
            throw new ApplicationError("Post not found", 404);
        }
        if(!content){
            throw new ApplicationError("Content cannot be empty", 400);
        }
        let newComment = new CommentModel(comments.length+1,userId,postId,content);
        comments.push(newComment);
        return newComment;
    }

    //Update comments to the post
    static update(id, userId, postId, content) {
        const post = PostsModel.getAllPosts().find((post) => post.id == postId);
        if (!post) {
            throw new ApplicationError("Post not found", 404);
        }

        // Find the index of the comment to update
        const index = comments.findIndex((comment) => comment.id == id && comment.postId == postId);
        if (index === -1) {
            throw new ApplicationError("Comment not found", 404);
        }

        // Check if the user is authorized to update the comment
        if (comments[index].userId !== userId) {
            throw new ApplicationError("You are not authorized to update this comment",403);
        }

        // Validate content
        if (!content) {
            throw new ApplicationError("Content is required for updating the comment",400);
        }

        // Update the comment
        comments[index].content = content;
        return comments[index];
    }


    //Remove comments from the post
    static remove(postId, userId) {
        const index = comments.findIndex((comment) => comment.id == postId && comment.userId == userId);
        if (index == -1) {
            throw new ApplicationError("comments not found for the post", 404);
        } else {
            comments.splice(index, 1);
        }
    }




}

var comments=[
{id:1,userId:1,postId:1,content:"Hello world!"},
{id:2,userId:2,postId:2,content:"Welcome to Coding Ninjas"},
{id:3,userId:3,postId:3,content:"Welcome to Social Media API"}
];