const db = require("../database/db");

const editProfileController = async(req,res,next)=>{

    try{
        const user_id = req.userId;
  console.log(user_id);
  const{name,password} = req.body;

  const result = await db.query(` UPDATE  users set name=COALESCE($1,name) ,password= COALESCE($2,password) where id= $3 returning *`,[name,password,user_id]);
  if(result.rows.length === 0){
    return res.status(404).json({
        message:"data not found"
    })
  }
   
  return res.status(201).json({
    message:"profile upadate successfully",
    data:result.rows[0]
    })
 
  
        

    }catch(err){
        next(err);
    }
}
module.exports = editProfileController