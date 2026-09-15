

 const errorMiddleware = (err,req,res,next)=>{



    res.status(500||err.status).json({
        message:err.message||"internal server error",
        stack:err.stack

    })


 }

 module.exports = errorMiddleware;