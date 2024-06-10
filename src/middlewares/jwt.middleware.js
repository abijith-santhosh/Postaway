import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next) => {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const payload = jwt.verify(token,"1pTwBM8xaP");
        req.userId = payload.userId; ;
        next();
    }catch(err){
        res.status(401).send("Access Denied");
    }
    next();
}

export default jwtAuth;