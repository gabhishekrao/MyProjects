const jwt =require("jsonwebtoken");
let userModel = require("../models/userModel")
let validator = require("validator")

const authentication=async function(req,res,next){
try{
    let bearerToken=req.headers.authorization
    
    
    if(!bearerToken) return res.status(400).send({status:false,message:"please provide token"});
    let token= bearerToken.split(" ")[1];

  let varify =  jwt.verify(token,"seven",function(error,decodedToken){
    if(error) return res.status(400).send({status:false,message:error.message})

    if(decodedToken)   req.token=decodedToken.userId
    next()
  })
  
}catch(error){
    return res.status(500).send({status:false,message:error.message});
}

}

const authorization= async function(req,res,next){
try{
  let userId = req.params.userId;
  if(!validator.isMongoId(userId))  return res.status(400).send({status:false,message:"please provide valid user id"});

  let findUser = await userModel.findOne({_id:userId});
  if(!findUser) return res.status(400).send({status:false,message:"user not found "})

   if(req.token !=userId)  return res.status(403).send({status:false,message:"you are not autherize for this"})

   next()
}catch(error){
  return res.status(500).send({status:false,message:error.message})

}
}

module.exports={authentication,authorization};