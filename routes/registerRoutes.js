const express=require('express');
const app=express()
const router=express.Router();
const bodyParser=require("body-parser")
const User=require('../schemas/UserSchema');
const bcrypt=require('bcrypt');


app.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    res.render('register')
})

router.post('/',async (req,res,next)=>{

    var firstName=req.body.firstName.trim();
    var lastName=req.body.lastName.trim();
    var username=req.body.username.trim();
    var email=req.body.email.trim();
    var password=req.body.password;

    var payload=req.body;
    if(firstName && lastName && username && email && password){
        var user=await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        }).catch((error)=>{
            console.log(error);
            payload.errorMessage="Something went wrong"
            res.render('register',payload);
        })

        if(user == null){
            //No user found
            var data=req.body;
            data.password=await bcrypt.hash(password,10);
            User.create(data).then((user)=>{
                req.session.user=user;
                return res.redirect("/");
            })
        }
        else{
            //User found
            if(email==user.email){
                payload.errorMessage="Email already in user."
            }else{
                payload.errorMessage="User name already in use."
            }
            res.render('register',payload);
        }
    }
    else{
        payload.errorMessage="Make sure each field has a valid value";
        res.render('register',payload)
    }

})
module.exports=router;