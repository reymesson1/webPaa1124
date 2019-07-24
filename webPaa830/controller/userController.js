var mongoose = require('mongoose');
var Master = require('../models/master.js');
var User = require('../models/user.js');
var Counter = require('../models/counter.js');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var dataTemp 

exports.setLogin = async(req, res) =>{

  var newUSer = req.body.nameValuePairs
  
  var user = await User.findOne(
    {"username":newUSer.username},
    function(err, u){

      bcrypt.compare(newUSer.password, u.password, (err, isMatch) =>{
          if(!isMatch){
              return res.status(401).send({message: 'Email or Password Invalid'})
          }
    
          var token = jwt.encode(u.username, '123')

    
          res.status(200).send({token})
      })
    }
  )
}