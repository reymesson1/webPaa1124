var mongoose = require('mongoose');
var Master = require('../models/master.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getMaster = async(req,res)=>{

  var master = await Master.find({})
  
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