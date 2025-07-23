import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary';
import axios from "axios";

const Ai = new OpenAI({
    apiKey:process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle= async(req , res)=>{
    try{
       const {userId}= req.auth();
       const {prompt, length}=req.body;
       const plan= req.plan;
       const free_usage= req.free_usage;

       if(plan !=='premium' && free_usage>=10){
          return res.json({success:false, message:"Limit exceeded, subscribe to premium."});
       }

       const response = await Ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content:prompt,
        },
    ],
    temperature:0.7,
    max_tokens:length,
});

const content= response.choices[0].message.content;

await sql` INSERT INTO creation (user_id, prompt, content, type)
VALUES (${userId},${prompt},${content},'article')`;

if(plan !== 'premium'){
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage: free_usage +1
        }
    })
}

res.json({success:true, content});

    }catch(error){
       console.log(error);
       res.json({success:false, message:error.message});
    }
} 

export const generateTitle= async(req , res)=>{
    try{
       const {userId}= req.auth();
       const {prompt}=req.body;
       const plan= req.plan;
       const free_usage= req.free_usage;

       if(plan !=='premium' && free_usage>=10){
          return res.json({success:false, message:"Limit exceeded, subscribe to premium."});
       }

       const response = await Ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content:prompt,
        },
    ],
    temperature:0.7,
    max_tokens:100,
});

const content= response.choices[0].message.content;

await sql` INSERT INTO creation (user_id, prompt, content, type)
VALUES (${userId},${prompt},${content},'title')`;

if(plan !== 'premium'){
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage: free_usage +1
        }
    })
}

res.json({success:true, content});

    }catch(error){
       console.log(error);
       res.json({success:false, message:error.message});
    }
} 

export const generateImage= async(req , res)=>{
    try{
       const {userId}= req.auth();
       const {prompt}=req.body;
       const plan= req.plan;

       if(plan !=='premium'){
          return res.json({success:false, message:"This feature is available in premium plan."});
       }

       const formData= new FormData();
       formData.append('prompt',prompt);
       const {data}= await axios.post("https://clipdrop-api.co/text-to-image/v1", formData,{
        headers:{'x-api-key': process.env.CLIPDROP_API_KEY},
        responseType:"arraybuffer",
       })
       const base64Image=`data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`;
 
      const {secure_url}= await cloudinary.uploader.upload(base64Image);



await sql` INSERT INTO creation (user_id, prompt, content, type)
VALUES (${userId},${prompt},${secure_url},'image')`;

res.json({success:true, secure_url});

    }catch(error){
       console.log(error);
       res.json({success:false, message:error.message});
    }
} 

export const getUserCreations = async (req, res) => {
  const userId = req.userId; 
  try {
      const rows = await sql`SELECT * FROM creation WHERE user_id = ${userId}`
    res.status(200).json({ success: true, creation: rows });
  } catch (error) {
    console.error("Error fetching creations:", error);
    res.status(500).json({ success: false, message: "Failed to fetch creations" });
  }
};