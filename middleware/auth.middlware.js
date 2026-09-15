const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv');
dotenv.config();

const authMiddleware = (req,res,next)=>{
    const authHeaders =  req.headers.authorization;

    const token = authHeaders&&authHeaders.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message:"invalid token"
            })
        }
        req.userId = decoded.userId;
        next();
    })


}
module.exports = authMiddleware;