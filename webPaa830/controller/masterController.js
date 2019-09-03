var mongoose = require('mongoose');
var Master = require('../models/master.js');
var Counter = require('../models/counter.js');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');
var dataTemp 

exports.getMaster = async(req,res)=>{

  var master = await Master.find({"status":{$ne:"removed"}})
  
  res.send(master);
}

setMasterUser = async(master, decode) =>{

  console.log(decode.sub)

  // var user = await User.findOne(
  //   {"_id":decode.sub},
  //   function(err, u){

  //     dataTemp = u.username      
  //   }
  // )

}

exports.setMaster = async(req,res)=>{
  
    var master = new Master(req.body);

    var decode = jwt.decode(req.body.user,'123')
    
    const ObjectId = mongoose.Types.ObjectId;        

    var data = req.body

    setMasterUser(master, decode)

    setTimeout(() => {

      data["user"] = dataTemp
  
      var master = new Master(data);
      
      master.save(function(err){
        if(!err){
          console.log('Master saved');
        }
      })
  
    }, 5000);

    
    res.send(req.body);
}

exports.updateMaster = async(req,res)=>{

  var master = await Master.findOne({"id":req.body.id},function(err,m){

      if(!err){
          
          m.payment=req.body.payment
          m.status="pagada"
          m.save(function(err, s){
              console.log('Payment Updated');
          })
      }
  })

  res.send(req.body);

}

exports.removeMaster = async(req,res)=>{

  var userData = req.body.token;

  console.log(req.body);

  var token = jwt.decode(req.body.token, '123')

  if(token.sub == "5d334c3682ba7d32e408c661"){//username:supreme

    var master = await Master.findOne({"id":req.body.id},function(err,m){
    
          if(!err){
              
              m.remove(function(err, s){
                  console.log('Removed Updated');
              })
          }
      })
    

  }
  
  res.send(req.body);


}

exports.getMasterPartials = async(req,res)=>{

  var master = await Master.find({})

  res.send(master)

}

exports.setMasterCounter = async(req,res)=>{

    var id = mongoose.Types.ObjectId('5d287f5f6e795adb18ec651c');  

    var counter = await Counter.findOneAndUpdate(
    { "_id" : id},
    {
      $inc: {
        quantity:1
      }
    }
  ); 

   res.send(req.body)
}

exports.getMasterCounter = async(req,res)=>{

    var counter = await Counter.find(); 


    res.send(counter);  
} 	