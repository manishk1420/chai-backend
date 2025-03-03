// require("dotenv").config({path: "./env"})
import dotenv from "dotenv";
import {app} from "./app.js";
import connectDB from "./db/index.js";
// import  express from "express"
// const app=express()

dotenv.config({
    path: "./env"
})

connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);   
})

})
.catch((err)=>{
    console.log("MONGO DB connection failed !!!",err);
    
})

















/*
import express from "express";
const app=express()

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR:",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.error("ERROR: ", error)
          throw err        
    }
})() */