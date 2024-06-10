import ApplicationError from "../../../middlewares/applicationError.middleware.js";

class PostsModel{
    constructor(id,userId,caption,imageUrl){
        this.id=id;
        this.userId=userId;
        this.caption=caption;
        this.imageUrl=imageUrl;
        this.savedBy = [];
        this.archived = false;
        this.bookmarkedBy = [];
    }

    //Add post
    static addPost(userId,caption,imageUrl){
        let newPosts = new PostsModel(posts.length + 1, userId, caption, imageUrl);
        posts.push(newPosts);
        return newPosts;
    }

    //Get a post by id
    static getPost(id){
        let post = posts.find(post=>post.id==id);
        if (!post) {
            throw new ApplicationError("Post not found for the given Id", 400);
          }
          return post;
    }

    //Get post by userId
    static getUserPost(userId) {
        return posts.filter((user) => user.userId == userId);
    }


    //Get all posts
    static getAllPosts(){
        return posts;
    }

     //Update post
     static update(id, userId, caption, imageUrl) {
     const index = posts.findIndex((i) => i.id == id && i.userId == userId);
     if (index == -1) {
        throw new ApplicationError("you are not authorized to update this post", 403);
        } 
    else {
      let updatedPost = new PostsModel(id, userId, caption, imageUrl);
      return (posts[index] = updatedPost);
        }
    }

     //Remove post
    static remove(postId, userId) {
    const index = posts.findIndex((i) => i.id == postId && i.userId == userId);
    if (index == -1) {
      throw new ApplicationError("you are not authorized  to delete this post",403);
        } 
    else {
      posts.splice(index, 1);
     }
    }


    //Filter pots by caption
  static getByCaption(caption) {
    console.log("Attempting to filter by caption:", caption);
    if (!caption.trim()) {
      throw new ApplicationError("Caption must be entered to filter.", 400);
    }

    const lowerCaseCaption = caption.toLowerCase(); // Convert the provided caption to lowercase
    const filteredPosts = posts.filter((post) => post.caption.toLowerCase().includes(lowerCaseCaption));

    if (filteredPosts.length === 0) {
      throw new ApplicationError("No posts found with the provided caption.",400);
    }

    console.log("Filtered posts:", filteredPosts);
    return filteredPosts;
  }
    
  //Save post
  static save(postId, userId) {
    const post = posts.find((post) => post.id == postId);
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    // Check if the user already saved the post
    if (post.savedBy.includes(userId)) {
      throw new ApplicationError("Post already saved by the user", 400);
    }

    post.savedBy.push(userId);
  }

  //Archive post
  static archivePost(postId) {
    const post = posts.find((post) => post.id == postId);
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    post.archived = true;
  }
  
  //Bookmark post
  static bookMark(postId, userId) {
    const post = posts.find((post) => post.id == postId);
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    // Check if the user already bookmarked the post
    if (post.bookmarkedBy.includes(userId)) {
      throw new ApplicationError("Post already bookmarked by the user", 400);
    }

    post.bookmarkedBy.push(userId);
  }


}

var posts=[new PostsModel(
1,
1,
"Nothing you wear is more important than your smile",
"https://akm-img-a-in.tosshub.com/indiatoday/images/story/media_bank/202310/world-smile-day-2023-062606116-1x1.jpg?VersionId=RhcIjxiGt6V7bVCT4CHxsYsZKqfppLpF"
),
new PostsModel(
2,
2,
"Alone with my thoughts, drowning in silence",
"https://www.adamenfroy.com/wp-content/uploads/sad-captions.jpg"
)];

export default PostsModel;