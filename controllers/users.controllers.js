const bcrypt = require('bcrypt');
const  db = require('../database/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Register = async(req,res,next)=>{
    const{name,email,password} = req.body;
    if(!name||!email||!password){
        return res.status(400).json({
            message:"name,email and password are required"
        })
    }

    try{
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password,saltRounds);
        const result = await  db.query(`Insert into users(name,email,password) values($1,$2,$3) returning * `,[name,email,password_hash]) ;
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"data not found"
            })
        }
        
       return res.status(201).json({
            message:"User register successfully"
        })


    }catch(err){
      next(err);

    }
}
const Login = async(req,res,next)=>{
    
   

    try{
        const{email,password} = req.body;
    
    if(!email|| !password){
        return res.status(400).json({
            message:"email and password are required"
    })
    }
         
        const result = await db.query(`select * from users where email = $1`,[email]);
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"user not found"
            })
        }
        const user = result.rows[0];

        const isMatchedUser =  await bcrypt.compare(password,user.password);
        
        if(!isMatchedUser){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }
        if(isMatchedUser){
        const{password,...safeuser} = user;
        const  payload = {userId:user.id};
        const token =  jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});

        

        return res.status(201).json({
            message:"Login successfully",
            user:safeuser,
            token:token

        })
    }


    }catch(err){
        next(err);
    }
}
 module.exports= {Login,Register};