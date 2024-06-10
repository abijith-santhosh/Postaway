import express from 'express';
import bodyParser from 'body-parser';
import swagger from "swagger-ui-express";
import cors from 'cors';

import postsRouter from './src/features/posts/routes/posts.routes.js';
import userRouter from './src/features/users/routes/user.routes.js';
import commentRouter from './src/features/comments/routes/comment.routes.js';
import likesRouter from './src/features/likes/routes/likes.routes.js';

import jwtAuth from './src/middlewares/jwt.middleware.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import ApplicationError from './src/middlewares/applicationError.middleware.js';
import apiDocs from "./swagger.json" assert { type: "json" };


const server=express();
const port = 3500;

server.use(cors());
server.use(bodyParser.json());
server.use(loggerMiddleware);


server.get('/', (req, res) =>{
    res.send("Welcome to social netwoking platform API's");
});

//API's
server.use("/api/docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/posts",jwtAuth,postsRouter);
server.use("/api/users",userRouter);
server.use("/api/comments",jwtAuth,commentRouter);
server.use("/api/likes",jwtAuth,likesRouter);

//Error handling middleware
server.use((err, req, res, next) => {
    console.log(err);
  
    if (err instanceof ApplicationError) {
      return res.status(err.code).send(err.message);
    }
    res.status(500).send("something went wrong");
  });

//Handling 404 errors
server.use((req,res)=>{
res.status(400).json("API not found for the request. Please verify the document to know more information at localhost:3500/api/docs")
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});