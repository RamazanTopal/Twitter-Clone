const express=require('express');
const app=express();
const port=3000;
const middleware=require('./middleware')
const path=require('path')
const mongoose=require('./database')
const session=require('express-session')
const bodyParser=require("body-parser")


app.set('view engine','pug');
app.set('views',"views");


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
//Routes
const loginRoute=require("./routes/loginRoutes");
const registerRoute=require("./routes/registerRoutes");

app.use("/login",loginRoute)
app.use("/register",registerRoute)


const server=app.listen(port,()=>{
    console.log("Server is listening on port"+port);
})

app.get('/',middleware.requireLogin,(req,res,next)=>{
    var payload={
        pageTitle:"Home",
        userLoggedIn:req.session.user
    }
    res.render('home',payload)
})