import { body, validationResult } from "express-validator";


//Validation for Posts
const addPostValidate = async (req, res, next) =>{
    //Set up rules for validation
    const rules=[
        body("userId").notEmpty().withMessage("userId is required"),
        body("caption").notEmpty().withMessage("caption is required"),
        body("imageUrl").custom((value, { req }) => {
            if (!req.file) {
              throw new Error("Image is Required to Upload a Post");
            }
            return true;
          }),
    ]

//run those rules
await Promise.all(rules.map((rule) => rule.run(req)));

//check if there are any errors after running the rules
var validationErrors = validationResult(req);

//if there are errors then return error message
if(!validationErrors.isEmpty()) {
    return res.status(400).json({errorMessage: validationErrors.array()[0].msg})
}
next();
};


//Validation for Registration
const userRegisterValidate = async(req,res,next) => {
  //Set up rules for validation
  const rules=[
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().isLength({min:8,max:18}).withMessage("password should be within 8 to 18 characters long"),
  ]

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()) {
    return res.status(400).json({errorMessage: validationErrors.array()[0].msg})
  }
next();

}


//Validation for Login
const userLoginValidate = async(req,res,next) => {
  //Set up rules for validation
  const rules=[
    body("email").notEmpty().isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().isLength({min:8,max:18}).withMessage("password should be within 8 to 18 characters long"),
  ]

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()) {
    return res.status(400).json({errorMessage: validationErrors.array()[0].msg})
  }
  next();
}





export {addPostValidate,userRegisterValidate,userLoginValidate};

