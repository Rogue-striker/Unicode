import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken"
import  env from "dotenv"

/*model imports */
import user from "./models.js";
import { Projects } from "./models.js";

env.config()


/*user credentials */

var useremail="";
var accesstoken ;


/*app config */

const app = express();
const port = 5001;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


/*mongodb setup */

const local_mongodb_url = `mongodb://localhost/kiranperaka`;

mongoose.connect(local_mongodb_url,(err)=>{
    if(err)
    {
        console.log("not connected successfully");
    }
    else{
        console.log("connected successfully");
    }
});

//mail service
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"unicode.suppport@gmail.com",
        pass:"kiran@123"
    }
})

app.post("/login",(req,res)=>{
    const user_email = req.body.user_email;
    const passcode  = req.body.password;

    user.findOne({email:user_email},(err,result)=>{
        if(err){
            res.json({err:true});
        }
      else if(!result){
            res.json({found:false})
        }
        else{
            if(result.password === passcode && result.verified){
                useremail = result.email;
               
                accesstoken = jwt.sign({useremail:result.name},process.env.ACCESS_TOKEN,{expiresIn:"1 day"})

               res.json({token:accesstoken,login:true,name:result.name})
            }
            else{
                if(result.verified===false){
                    res.json({verified:false})
                }else{
                res.json({login:false});
                }
            }
        }
    });
});

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const passcode = req.body.password;
    const user_email = req.body.email;
    user.findOne({email:user_email},(err,result)=>{
        
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
                    password:passcode,
                    verified:false
                });
                
                save_data.save();
                useremail = save_data.email;
                const link= jwt.sign({email:user_email},process.env.ACCESS_TOKEN,{expiresIn:"10min"})
                var mailOptions = {
                    from:"unicode.suppport@gmail.com",
                    to: user_email,
                    subject:"Verify Your Account",
                    text:`Please verify your account by clicking this link http://localhost:3000/verifyemail/${link} link expires in 10 mins`
                } 
                transporter.sendMail({...mailOptions},(err,info)=>{
                    if(err){
                       if(err.code){
                            res.sendStatus(404)
                       }
                    }
                    else{
                        res.status(200).json({signedup:true})
                    }
                })
            }
        }
    })
});
app.post("/forgetpassword",(req,res)=>{
    const email = req.body.email
    const link= jwt.sign({email:req.body.email},process.env.ACCESS_TOKEN,{expiresIn:"10min"})
    var mailOptions = {
        from:"support@unicode.com",
        to: email,
        subject:"Verify Your Account",
        text:`Please change your account password by clicking this link http://localhost:3000/changepassword/${link} link expires in 10 mins`
    } 
    transporter.sendMail({...mailOptions},(err,info)=>{
        if(err){
           if(err.code){
                res.sendStatus(404)
           }
        }
        else{
            res.sendStatus(200)
        }
    })
    
})
app.post("/changepassword",authenticateToken,(req,res)=>{
    const email = req.emaildata.email;
    const password = req.body.password
    user.updateOne({email:email},{password:password},(err,result)=>{
        if(err){
            res.status(404).json({updation:false})
        }
        else{
            res.status(200).json({updation:true})
        }
    })
})
app.post("/deleteComment",authenticateToken,(req,res)=>{
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

app.get("/myProjects",authenticateToken,(req,res)=>{
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

app.post("/addproject",authenticateToken,(req,res)=>{
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

app.get("/projects",authenticateToken,(req,res)=>{
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
app.post("/comment",authenticateToken,(req,res)=>{
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

app.post("/getproject",authenticateToken,(req,res)=>{
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
                   
                    if(comment._id ==req.body.comment_id){
                        comment.solved = true
                    }
                })
               
                result.save();
                res.json({solved:true});
            }
            else{
                res.send({found:true});
            }
        }
    })
})

app.post("/deleteProject",authenticateToken,(req,res)=>{
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

app.post("/verifyemail",(req,res)=>{
    const token = req.body.token;
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,obj)=>{
        if(err){
            user.deleteOne({email:email},(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if(result){
                        res.status(404).json({verifed:false})
                    }
                }
            })
        }
        else{
            const email = obj.email
            user.updateOne({email:email},{verified:true},(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if(result){
                        res.status(200).json({verifed:true})
                    }
                }
            })
        }
    })
})
function authenticateToken(req,res,next){
    const auth_header = req.headers['authorization'];
    if(auth_header==null){
        res.sendStatus(401)
    }
    else{
        const token = auth_header.split(' ')[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,obj)=>{
            if(err){
                res.sendStatus(403)
            }
            else{
                req.emaildata = obj;
                next()
            }
        })
    }
    
}
app.listen(port,()=>{
    console.log("the server is running on the port "+port);
});