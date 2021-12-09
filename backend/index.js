import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';


/*model imports */
import user from "./models.js";
import { Projects } from "./models.js";



/*user credentials */
var useremail="";


/*app config */
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


/*mongodb setup */
//const local_mongodb_url = `mongodb://localhost/Unicodes`;
const mongodb_url = `mongodb+srv://unicode:unicode@cluster0.qcp7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(mongodb_url,(err)=>{
    if(err)
    {
        console.log("not connected successfully");
    }
    else{
        console.log("connected successfully");
    }
});

app.post("/login",(req,res)=>{
    const user_email = req.body.user_email;
    const passcode  = req.body.password;

    user.findOne({email:user_email},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(!result){
                res.json({found:false})
            }
            if(result.password === passcode){
                useremail = result.email;
                res.status(200);
                res.json({login:true,name:result.name});
            }
            else{

                res.json({login:false});
            }
        }
    });
});

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const passcode = req.body.password;
    const user_email = req.body.email;
    user.exists({email:user_email},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(result){
                res.json({found:true});
            }
            else{
                const save_data = user({
                    name:username,
                    email:user_email,
                    password:passcode
                });
                save_data.save();
                useremail = save_data.email;
                res.json({signup:true});
            }
        }
    })
});

app.post("/deleteComment",(req,res)=>{
    const project_id = req.body.project_id;
    const comment_id = req.body.comment_id;

    Projects.findOne({_id:project_id},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else
        {
            if(result){
                for(var i=0;i<result.comments.length;i++){
                    
                    if(comment_id==result.comments[i]._id){
                        result.comments.splice(i,1);
                    }
                    
                }
                result.save();
                res.json(result);
            }
            else
            {
                res.json({found:false});
            }
        }
    })

})

app.get("/myProjects",(req,res)=>{
    Projects.findOne({user_email:useremail},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else
        {
            if(result){
                res.json(result);
            }
            else{
                res.send([]);
            }
        }
    })
});

app.post("/addproject",(req,res)=>{
    Projects.findOne(

        {   
            user_email:req.body.user_email,
            $or: [
                { title:req.body.title }, 
                { project_link:req.body.project_link }
            ]
        },

        (err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(result){
                res.json({exists:true});
            }
            else
            {
                const save_data = new Projects({
                    user_email:req.body.user_email,
                    title:req.body.title,
                    description:req.body.description,
                    date:new Date().toString(),
                    project_link:req.body.project_link,
                    comments:[]
                });
                save_data.save();
                res.json({added:true});
            }
        }
    });
});

app.get("/projects",(req,res)=>{
    Projects.find({},(err,result)=>{
       
        if(err){
            res.json({err:true});
        }
        else{
            if(result){
                res.status(200).send(result);
            }
            else
            {
                res.json([]);
            }
        }
    })
});
app.post("/comment",(req,res)=>{
    Projects.findOne({_id:req.body.id},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(result){
                user.findOne({email:req.body.useremail},(err,result_user)=>{
                    if(err){
                        res.json({userfound:false});
                    }
                    else
                    {
                        if(result_user){

                            console.log(result_user)
                            const new_comment = { 
                                user_email:result_user.email,
                                user_name:result_user.name,
                                comment:req.body.comment,
                                date:new Date().toISOString(),
                                solved:false
                            }
                            result.comments.push(new_comment);
                            result.save();
                            res.json({updated:true,project:result});
                        }
                        else{
                            res.send({found:false});
                        }
                    }
                })
            }
            else
            {
                res.json({found:false});
            }
        }
    })
})

app.post("/getproject",(req,res)=>{
    Projects.findOne({_id:req.body.id},(err,result)=>{
        if(err){
            res.json({found:false});
        }
        else
        {
            if(result){
                res.json(result);
            }
            else{
                res.json({found:false});
            }
        }
    })
});

app.post("/projectsolved",(req,res)=>{
    Projects.findOne({_id:req.body.id},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(result){

                result.comments.map((comment)=>{
                    console.log(comment._id,req.body.comment_id,"line 256")
                    if(comment._id ==req.body.comment_id){
                        comment.solved = true
                    }
                })
               // console.log(result)
                result.save();
                res.json({solved:true});
            }
            else{
                res.send({found:true});
            }
        }
    })
})

app.post("/deleteProject",(req,res)=>{
    user.findOne({email:useremail},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(result){
                Projects.findOneAndRemove({_id:req.body.id,user_email:useremail},(err)=>{
                    if(err){
                        res.json({err:true});
                    }
                    else
                    {
                        res.json({removed:true});
                    }
                });
            }
            else{
                res.json({found:false});
            }
        }
    })
    
})
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"unicode.suppport@gmail.com",
        pass:"kiran@123"
    }
})
var otp = ""
app.post("/verifyemail",(req,res)=>{
    otp = Math.floor( Math.random(.6)*1000000)
    const email = req.body.email
    var mailOptions = {
        from:"support@unicode.com",
        to: email,
        subject:"sending email through nodemailer",
        text:`Your OTP is ${otp} please never share this with anyone`
    } 
    transporter.sendMail({...mailOptions},(err,info)=>{
        if(err){
           if(err.code){
              console.log(err.code)
                res.json({'otp':false})
           }
        }
        else{
          //  console.log("otp" ,otp)
            res.json({"otp":true})
        }
    })
    
})


app.listen(port,()=>{
    console.log("the server is running on the port "+port);
});