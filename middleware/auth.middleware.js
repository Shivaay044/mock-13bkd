const jwt = require("jsonwebtoken")
require("dotenv").config()


const auth = (req,res,next)=>{

    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
         if(err){
            res.status(400).send("invalid token")
         }
        req.body.userId = decoded.userId
         next()
      });
}



module.exports = auth