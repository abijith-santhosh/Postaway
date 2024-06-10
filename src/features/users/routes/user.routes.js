import express from 'express';

import UserController from '../controllers/user.controller.js';
import { userRegisterValidate,userLoginValidate } from '../../../middlewares/validation.middleware.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/register',userRegisterValidate, userController.register);
userRouter.post('/login',userLoginValidate, userController.login);

export default userRouter;