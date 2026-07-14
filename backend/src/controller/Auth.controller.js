import User from "../model/User.model.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000 
};

export const generateAccessandRefreshToken=async(userId)=>{
    const user=await User.findById(userId)
    if(!user){
        throw new Error("User not found")
    }
    try{
        const accessToken=await user.generateAccestoken()
        const refreshToken=await user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    }
    catch(error){
        console.error("Error generating tokens:", error);  

    }
}

export const SingUp=async(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide all required fields"})
    }
    try{
        const existingUser=await User.findOne({email})
    }
    catch(error){}
}