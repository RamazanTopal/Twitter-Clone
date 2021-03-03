const express=require('express');
const router=express.Router();
const User=require('../schemas/UserSchema');
const bcrypt=require('bcrypt');

router.get('/',(req,res,next)=>{
    res.render('login')
})
router.post('/',async (req,res,next)=>{
    var payload=req.body;

    if(req.body.logUsername && req.body.logPassword){
         var user=await User.findOne({
            $or:[
                {username:req.body.logUsername },
                {email:req.body.logUsername }
            ]
        }).catch((error)=>{
            console.log(error);
            payload.errorMessage="Something went wrong"
            res.render('login',payload);
        });

        if(user != null){
            var result=await bcrypt.compare(req.body.logPassword,user.password);
            if(result === true){
                req.session.user=user;
                return res.redirect("/");
            }
           
        }

        payload.errorMessage="Login credentials incorrect."
        return res.render('login',payload);
            

    }
     payload.errorMessage="Make sure each field has a valid value."
    res.render('login',payload)
})

module.exports=router;