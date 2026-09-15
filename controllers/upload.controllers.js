
const cloudinary = require('../config/cloudinary');
const db = require('../database/db');
const crypto = require('crypto');
const fs  = require('fs');
const uploadController = async(req,res,next)=>{
   

    try{
     const user_id = req.userId;
     const share_code = crypto.randomBytes(6).toString('hex').toUpperCase();

        if(!req.file){
            return res.status(404).json({
                message:"Please upload the file"
            })
        }
        console.log(req.file);
       console.log(req.file.path);
       const readStream = fs.createReadStream(req.file.buffer)
       
        

        const uploadStream =  cloudinary.uploader.upload_stream({
            resource_type: "auto"
        },
        async(error,result)=>{
            try{
                if(error){
                    console.log('cloudinary error',error);
                    fs.unlink(req.file.buffer,()=>{});
                    return next(error)
                    
                }
                else{
                    console.log('clodinary result',result);
                     const {  url, public_id, resource_type,  format} = result;
                       const{originalname} = req.file;
                       console.log(originalname);
                      const response = await db.query(`insert into  file(user_id,original_name,file_url,share_code,public_id,resource_type,format) Values($1,$2,$3,$4,$5,$6,$7) returning *`,[user_id,originalname,url,share_code,public_id,resource_type,format]);
                      fs.unlink(req.file.path,(unlinkError)=>{
                        if(unlinkError){
                            console.log('temporery file deletion error');    
                        }
                        else{
                            console.log("temporery file deleted");
                            
                        }
                      });

                 if(response.rows.length === 0){
                return res.status(404).json({
                message:"data not found"
             })
            }
           
               
    console.log(response.rows[0]);

      return res.status(201).json({
            message:"cloduinary url",
            cloudinary_url:result.secure_url,
            response:response.rows[0],
            share_code:share_code
      });
    }

}catch(err){
    next(err);

    }

})
readStream.on('data',(chunk)=>{
    console.log("new chunk recieved");
    uploadStream.write(chunk)
    
})
readStream.on('end',()=>{
    console.log("file read successfully");
    uploadStream.end();
    
})
 readStream.on('error', (error) => {
      console.log('Read stream error:', error);

      uploadStream.destroy(error);

      // Delete temporary file
      fs.unlink(req.file.path, () => {});

      next(error);
    });

    
    }catch(err){
       next(err);
    }
}

module.exports = uploadController;