const express =  require('express');
const uploadRouter = require('./routes/upload.routes');
const errorMiddleware = require('./middleware/error.middleware');
const cors = require('cors');
const userRouter = require('./routes/users.routes');
const authMiddleware = require('./middleware/auth.middlware');
const getUpload = require('./routes/getUpload.routes');
const downloadRouter = require('./routes/download.routes');
const getprofileRouter = require('./routes/getProfile.routes');
const editProfileRouter = require('./routes/editProfile.routes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());

app.use(userRouter);
app.use(authMiddleware);
app.use(editProfileRouter);
app.use(getprofileRouter)
app.use(uploadRouter);  
app.use(downloadRouter);
app.use(getUpload);




app.use(errorMiddleware);



app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
    
})