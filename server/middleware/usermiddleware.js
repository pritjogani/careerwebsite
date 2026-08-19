const jwt = require('jsonwebtoken')
const User = require("../model/usermodel");

const usermiddleware = async (req,res,next) =>{
    const token = req.header("Authorization");
    if(!token) {
        return res.status(401).json({msg:"token not provided"})

    }
    const jwtoken = token.replace("Bearer","").trim();
    console.log("token from auth middleware",jwtoken);
    try{
        const isVerified = jwt.verify(jwtoken,process.env.JWT_SECTECT_KEY)
        console.log(isVerified);
        const userdata = await User.findOne({email: isVerified.email}).select({
            password: 0
        });
        req.user = userdata;
        req.token = token;
        req.userID = userdata._id;
        
          console.log(userdata);
    }catch(error)
    {
        return res.status(401).json({message:"unauthorized invaild token"})

    }
    
    next();
}

module.exports = usermiddleware;