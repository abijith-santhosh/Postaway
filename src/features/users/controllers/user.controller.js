import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export default class UserController{

    //Registration for new user
    register(req,res,next){
        const {name,email,password}= req.body;
        let newUser =UserModel.signUp(name,email,password);
        res.status(201).send(newUser);
    }

    //Login for existing user and sending token
    login(req,res,next){
        const email = req.body.email;
        const password = req.body.password;
        try{
            const user = UserModel.signIn(email,password);
            if(!user){
                res.status(401).send("Invalid email or password");
            }
            else{
                //Create token
                const token = jwt.sign({
                    userId: user.id,
                    email:user.email, 
                },
                "1pTwBM8xaP",
                {expiresIn:'1h'}
            );
                //Send token
                res.status(200).send(token);
            }
        }catch(error){
            next(error);
     }
    }
}