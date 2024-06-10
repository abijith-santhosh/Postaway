import PostsModel from "../models/posts.model.js"
import ApplicationError from "../../../middlewares/applicationError.middleware.js";


export default class PostsController{
    //Get all posts
    getPosts(req, res, next) {
        try {
          const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
          const limit = parseInt(req.query.limit) || 10; // Default limit of 10 posts per page
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
    
          const posts = PostsModel.getAllPosts();
          const paginatedPosts = posts.slice(startIndex, endIndex);
          if(paginatedPosts.length ===0){
            throw new ApplicationError("No posts available for the specified page",404);
          }
    
          res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(posts.length / limit),
            posts: paginatedPosts
          });
        } catch (error) {
          next(error);
        }
      }

    //Add a post
    addPost(req,res,next){
        const userId = req.userId;
        const { caption } = req.body;
        const imageUrl = req.file.filename;
        let newPost = PostsModel.addPost(userId, caption, imageUrl);
        res.status(201).send(newPost);

    }
    //Get a post
    getPost(req,res,next){
        try {
            const id = req.params.id;
            let Post = PostsModel.getById(id);
            res.status(200).send(Post);
          } catch (error) {
            next(error);
          } 
    }

     // Get UserPost By UserId
    getUserPost(req, res, next) {
        const userId = req.userId;
        let userPost = PostsModel.getUserPost(userId);
        res.status(200).send(userPost);
    }

    // Update Post By Id
    updatePost(req, res, next) {
        const id = req.params.id;
        const userId = req.userId;
        const { caption, imageUrl } = req.body;
        try {
            const updatedPost = PostsModel.update(id, userId, caption, imageUrl);
            res.status(200).json(updatedPost);
        } catch (error) {
            next(error);
        }
    }

    // Delete Post By Id
  deletePost(req, res, next) {
        const postId = req.params.id;
        const userId = req.userId;
        try {
            PostsModel.remove(postId, userId);
            return res.status(200).send("Post is Deleted");
        } catch (error) {
            next(error);
        }
    }
  
    //Filter post by caption
    filterPosts(req, res, next) {
        try {
            const caption = req.query.caption;
            console.log("Filtering by caption:", caption);
            const filteredPosts = PostsModel.getByCaption(caption);
            console.log("Filtered posts:", filteredPosts);
            res.status(200).json(filteredPosts);
        } catch (error) {
            next(error);
        }
    }
    
    //Save post
    savePosts(req, res, next) {
        const postId = req.params.postId;
        try {
          const userId = req.userId;
          PostsModel.save(postId, userId);
          res.status(201).send("Post saved successfully");
        } catch (err) {
          next(err);
        }
    }

    //Archive post
    archivePost(req, res, next) {
        const postId = req.params.postId;
        try {
          PostsModel.archivePost(postId);
          res.status(201).send("Post archived successfully");
        } catch (error) {
          next(error);
        }
    }
    
    //Bookmark post
    bookmarkPost(req,res,next){
        try {
          const postId =req.params.postId;
          const userId = req.userId;
          PostsModel.bookMark(postId,userId);
          res.status(200).send("Post Bookmarked");
          } catch (error) {
          next(error)
        }
    }


}