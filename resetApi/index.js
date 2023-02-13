const express=require('express');
const app=express();
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth.js")
const userRoute=require("./routes/users.js")
const postRoute=require("./routes/posts.js")
const categoryRoute=require("./routes/categories.js")
const multer= require("multer")



dotenv.config();
mongoose.set('strictQuery', false);
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.listen("3000",()=>{
    console.log("Backend is running");
});
const storage=multer.diskStorage({
    destination:"./images",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})
app.use(express.json());
app.use(express.urlencoded({extended:false}))
mongoose.connect(process.env.MONGO_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
// useCreateIndex: true,

}).then(console.log("connect MongoDB")).catch(err=>console.log(err));

// console.log("Jacques");
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);

app.use("/me",(req,res)=>{
    console.log("This Jacques url")
})