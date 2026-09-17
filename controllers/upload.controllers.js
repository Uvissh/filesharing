
const cloudinary = require('../config/cloudinary');
const db = require('../database/db');
const {Readable} = require("stream");
const path = require("path");

const uploadController = async(req,res,next)=>{
   

    try{
     const user_id = req.userId;
     const share_code = Math.floor(1000 + Math.random() * 9000);

        if(!req.file){
            return res.status(404).json({
                message:"Please upload the file"
            })
        }
        console.log(req.file);
       console.log(req.file.path);
       const readStream=Readable.from(req.file.buffer)

       let resourceType;

  if (req.file.mimetype.startsWith("image/")) {
    resourceType = "image";
} 
else if (req.file.mimetype.startsWith("video/")) {
    resourceType = "video";
} 
else {
    resourceType = "raw",
     public_id= `${Date.now()}_${path.parse(req.file.originalname).name}.pdf`
}
       
        

        const uploadStream =  cloudinary.uploader.upload_stream({
            resource_type: resourceType
        },
        async(error,result)=>{
            try{
                if(error){
                    console.log('cloudinary error',error);
                  
                    
                }
                else{
                    console.log('clodinary result',result);
                     const {  secure_url, public_id, resource_type} = result;
                       const{originalname} = req.file;
                       const format = path.extname(originalname).slice(1);
                       console.log(originalname);
                      const response = await db.query(`insert into  file(user_id,original_name,file_url,share_code,public_id,resource_type,format) Values($1,$2,$3,$4,$5,$6,$7) returning *`,[user_id,originalname,secure_url,share_code,public_id,resource_type,format]);
                

                 if(response.rows.length === 0){
                return res.status(404).json({
                message:"data not found"
             })
            }
           
          console.log("databse result");
               
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
     
      next(error);
    });

    
    }catch(err){
       next(err);
    }
}

module.exports = uploadController;