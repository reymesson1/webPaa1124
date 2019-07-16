var mongoose = require('mongoose');
var Master = require('../models/master.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getMaster = async(req,res)=>{

  var master = await Master.find({"status":{$ne:"removed"}})
  
  res.send(master);
}

exports.setMaster = async(req,res)=>{
  
    var master = new Master(req.body);
    
    master.save(function(err){
      if(!err){
        console.log('Master saved');
      }
    })
    
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

  var token = jwt.decode(req.body.token, '123')

  if(token.sub == "5d091ad3c382341e4c088c72"){//username:supreme

    var master = await Master.findOne({"id":req.body.id},function(err,m){
    
          if(!err){
              
              m.status="removed"
              m.save(function(err, s){
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

exports.getMasterCustomer = async(req,res)=>{

    var master = await Master.findOne(
        
        {   "id": req.body.id},

        function(err,masterOne){

            if(!err){

                masterOne.email = req.body.email

                masterOne.save(function(err,user){
                    console.log('Customer Updated', user)
                })

            }


        }
    )
    
}