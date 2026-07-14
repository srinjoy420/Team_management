import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture:{
        type:String,
        default:"https://ui-avatars.com/api/?name=John+Doe&background=randomhttps://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    role: {
        type: String,
        default: "user"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    currentWorkSpace:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workspace"
    },
    lasLogin:{
        Type:Date,
        default:null
    },
    refreshToken: {
        type: String,
    }


}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccestoken = function () {
    jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.emai
        },
        process.env.ACESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
             _id:this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}
const User=mongoose.model("User",userSchema)
export default User