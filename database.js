const mongoose=require('mongoose');
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useUnifiedTopology',true);
class Database{

    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect('mongodb://localhost/twitter-clone').then(()=>{
    console.log("database connection successfull")
        }).catch((err)=>{
    console.log("database connection error"+err);
        })
    }
}
module.exports=new Database();