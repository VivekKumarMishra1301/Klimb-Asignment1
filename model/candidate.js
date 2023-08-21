const mongoose=require('mongoose');
const candidate=new mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    dob:String,
    work_exp:String,
    resume_Title:String,
    current_Location:String,
    postal_Address:String,
    current_Employer:String,
    current_Designation:String
});

const cand=mongoose.model("candidateTable",candidate);
module.exports=cand;