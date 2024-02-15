const mongoose=require('mongoose')
// giving the blueprint of the incoming data to the mongodb
const { ObjectId } = mongoose.Schema.Types;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:ObjectId,ref:"User"
    }] ,
    following:[{
        type:ObjectId,ref:"User"
    }] 
})
mongoose.model("User",userSchema)
// User us the model name of the schema