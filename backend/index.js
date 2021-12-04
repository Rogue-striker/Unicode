import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";


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
const local_mongodb_url = `mongodb://localhost/Unicode`;

//const mongodb_url = "mongodb+srv://kiranperaka:striker_peraka@cluster0.jc2cu.mongodb.net/uniCode?retryWrites=true&w=majority";

mongoose.connect(local_mongodb_url,(err)=>{
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
    console.log(req.body);
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
                const save_data = new user({
                    name:username,
                    email:user_email,
                    password:passcode
                });
                save_data.save();
                useremail = save_data.email;
                console.log(save_data);
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
            user_email:useremail,
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
                    user_email:useremail,
                    title:req.body.title,
                    description:req.body.description,
                    date:req.body.date,
                    project_link:req.body.project_link,
                    solved:false,
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
    const useremail=req.body.useremail;
    Projects.findOne({_id:req.body.id},(err,result)=>{
        if(err){
            res.json({err:true});
        }
        else{
            if(result){
                user.findOne({email:useremail},(err,result_user)=>{
                  
                    if(err){
        
                        res.json({userfound:false});
                    }
                    else
                    {
                        if(result_user){
                            const new_comment = {
                                user_name:result_user.name,
                                comment:req.body.comment,
                                date:req.body.date
                            }
                            result.comments.push(new_comment);
                            result.save();
                            res.json({updated:true});
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
                result.solved = true;
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





app.listen(port,()=>{
    console.log("the server is running on the port "+port);
});