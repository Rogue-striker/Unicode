import mongoose from "mongoose";

const user = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    verified:Boolean,
});

const comment_schema = {
    user_email:String,
    user_name:String,
    comment:String,
    date:String,
    solved:Boolean
}

const projects = new mongoose.Schema({
    user_email:String,
    title:String,
    description:String,
    date:String,
    project_link:String,
    comments:[comment_schema]
});


const User = mongoose.model('user',user);
const Projects = mongoose.model('projects',projects);

export default User;
export {Projects};
