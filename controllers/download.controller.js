const db = require("../database/db");
const axios = require('axios');


 const downloadfile = async(req,res,next)=>{

    try{
        const{share_code} = req.params;
        console.log(share_code);
        const result = await db.query(`select * from file where share_code = $1 `,[share_code]);
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"data not found"
            })
        }
        const file = result.rows[0];
        const response  = await axios.get(file.file_url,{
            responseType:"arraybuffer"
        })
        console.log("file is downling");
        
        console.log(response);
        
        
        
        res.setHeader("content-Disposition",
            `attachment;filename:"${file.original_name}"`
        )
        res.setHeader("content-type",response.headers["content-type"])

        res.send(response.data);
      
        

    }catch(err){
        next(err)
    }
 }
 module.exports =  downloadfile;