const express=require('express');
const router=express.Router();
const User=require('../../schemas/UserSchema');
const Post=require('../../schemas/PostSchema');

router.get('/',(req,res,next)=>{
   Post.find().populate("postedBy").sort({"createdAt":-1}).then((results)=>{
        res.send(results)
   }).catch(()=>{
        res.sendStatus(404);
   })
})
router.post('/',async (req,res,next)=>{
   if(!req.body.content){
       console.log("content param not sent with request")
       return res.sendStatus(400);
   }
   var postData={
       content:req.body.content,
       postedBy:req.session.user
   }
   Post.create(postData).then(async (newPost)=>{
    newPost=await User.populate(newPost,{path:"postedBy"})
    res.status(201).send(newPost);

   }).catch((err)=>{
    console.log(err);
    res.sendStatus(400);
   })
  
})

module.exports=router;