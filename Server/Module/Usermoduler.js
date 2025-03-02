import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String, 
        enum: ['admin', 'officer'], 
        default: 'officer' 
    },
    officerCode: { type: String, unique: false, default: null },
        
})

const User = mongoose.model('User',UserSchema)

export default User;