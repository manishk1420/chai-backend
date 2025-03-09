import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
 import {User} from '../models/user.model.js';
import {uploadImageToCloudinary, uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse  } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{
   // how to register user
   //steps:
   // 1 get user details from frontend
   // 2 validate user details- check not empthy
   // 3 check if user already exists: username,email
   // 4 chekc for images,check for avatar
   // 5 upload then to cloudinary,avatar
    // 6 create user object-create entry in db
    // 7 remove password and refresh token field from response
    // 8 check for user creation
    // 9 return response 



   // 1 get user details from frontend
   const { fullName,email,username,password}=req.body
   console.log("email",email);


    // 2 validate user details- check not empthy
    // if(fullName=== ""){
    //     throw new ApiError(400,"Full name is required")
    // }
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
       throw new ApiError(400,"All fields are required") 
    }


    // 3 check if user already exists: username,email
    const existedUser=User.findOne({
        $or:[{username},{email}]})
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    // 4 chekc for images,check for avatar
   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath=req.files?.coverImage[0]?.path;
     if(!avatarLocalPath){
         throw new ApiError(400,"Avatar is required")
     }

    // 5 upload then to cloudinary,avatar

const avatar= await uploadOnCloudinary(avatarLocalPath)
 const coverImage=await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar ){
     throw new ApiError(400,"Avatar file is required")
 }

  // 6 create user object-create entry in db
   const user= await User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
  })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken")

if(!createdUser){
    throw new ApiError(500,"Somthing went wrong while registering the  user")
}

// 9 return response

return res.status(201).json(new ApiResponse(200,createdUser,"User registered Successfully"))

} )

export {registerUser,} 