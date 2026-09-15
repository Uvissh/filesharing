const db = require("../database/db");

const getProfileController = async(req,res,next)=>{
    try{
        const user_id = req.userId;

        const result = await db.query(`select * from users where id = $1`,[user_id]);
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"Data not  found"
            })  
        }
        return res.status(200).json({
            message:"user profile",
            data:result.rows[0]
    })

    }catch(err){
        next(err);
    }
} 
module.exports = getProfileController