import ApplicationError from "../../../middlewares/applicationError.middleware.js";

export  default class UserModel{
    constructor(id,name,email,password)
    {
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    //Signup for user
    static signUp(name,email,password){
        const user=new UserModel(users.length+1,name,email,password);
        users.push(user);
        return user;
    }

    //Signin for user 
    static signIn(email,password){
        let user= users.find(user=>user.email==email && user.password==password);
        if(!user){
            throw new ApplicationError("Invalid email or password.", 400);
        }
        else{
            return user;
        }
    }

}

var users=[{
    id:1,
    name:"admin",
    email:"admin@gmail.com",
    password:"admin123"
},{
    id:2,
    name:"user1",
    email:"user1@gmail.com",
    password:"userpassword1"
}];
