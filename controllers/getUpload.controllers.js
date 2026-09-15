const db = require("../database/db");

const getUploadController = async(req,res,next)=>{
try{
    const {share_code} = req.params;
    console.log( "share_code",share_code);
    
    
    const result = await db.query(`select * from file where share_code= $1`,[share_code]);
    if(result.rows.length === 0){
        return res.status(404).json({
            message:"Data not found"
        })
    }
    const  data = result.rows[0];
    console.log(data);
    
     return res.status(201).json({
        message:"Data get successfully",
        data:data,
       

     })

}catch(err){
    next(err);
}

}
module.exports = getUploadController;