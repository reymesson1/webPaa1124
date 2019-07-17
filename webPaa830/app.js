var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var app = express();
app.use(express.static('static'))
var dba = require('./lib/dba-helper.js')();
app.use(bodyParser.json());
var cookies = false;
var User = require('./models/user.js');
var masterController = require('./controller/masterController');
var Wallet = require('./models/wallet.js');

app.get('/cookies', function(req,res){

    res.send(cookies);
});

app.post('/cookies', function(req,res){

    var newCookie = req.body;

    if(newCookie.username=='mechy'){
        console.log(req.body);
        cookies=true;
    }
});

app.get('/master', masterController.getMaster)

app.post('/master', masterController.setMaster);

app.post('/payment', masterController.updateMaster);

app.post('/deletemaster', masterController.removeMaster);

app.get('/reporte', masterController.getMasterPartials)

var detail = [];

app.get('/detail',function(req,res){
 
    dba.getDetail({}, function(data){
	    res.send(data);
    });
});

app.post('/detail', function(req,res){

    detail.push(req.body);
    dba.addDetail(req.body)  
    res.send(req.body)
});

app.post('/deletedetail', function(req,res){

    var obj = req.body;  
    dba.removeDetail({"id":obj.id})
    detail.splice(obj.index,1);
});

app.post('/updatedetail',function(req,res){
    var obj = req.body;
    detail[obj.index].name=obj.name;

})

app.get('/logout',function(req,res){

    cookies = false;
    res.redirect('/');
});

app.get('/weeklyreport',function(req,res){

    dba.getWeeklyReport({}, function(data){
            res.send(data);
    });

})

app.get('/weeklyreportrecap',function(req,res){

    dba.getWeeklyReportRecap({}, function(data){
            res.send(data);
    });

})

app.get('/weeklyreportbydev',function(req,res){

	dba.getWeeklyReportbyDevelopment({},function(data){

		res.send(data)
	})
})

app.get('/peluquera', function(req,res){

    dba.getPeluquera({}, function(data){

        res.send(data);

    });

})

app.post('/peluquera', function(req,res){

    dba.addPeluquera(req.body)  
    res.send(req.body)
});

app.post('/deletepeluquera', function(req,res){

    var index = req.body;

    var id = index.id;
    
    dba.setPeluquera({"id":id});

    res.send(req.body);
});

app.post('/register', async (req, res)=>{
    
    var userData = req.body;

    var user = new User({
        "username":userData.username
    })
    bcrypt.hash(userData.password, null, null, (err, hash)=>{                   
        user.password = hash;          
    })
    user.save(function(err){
        if(!err){
            console.log('User saved');
        }
    })
  
})
  
app.post('/login', async (req, res)=>{
    var userData = req.body;
    var user = await User.findOne({username: userData.username});
    
    if(!user){
        return res.status(401).send({message: 'Email or Password Invalid'})
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
        if(!isMatch){
            return res.status(401).send({message: 'Email or Password Invalid'})
        }
        
    var payload = { sub: user._id }

    var token = jwt.encode(payload, '123')

    res.status(200).send({token})
    })

})

app.post('/resetpassword', async (req, res)=>{  
    
    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')
    userObj.author = decode.sub

    const ObjectId = mongoose.Types.ObjectId;        

    var user = await User.findOne({"_id":ObjectId(userObj.author)},function(err,users){
        if(!err){
            bcrypt.hash(userObj.newpassword, null, null, (err, hash)=>{                   
                users.password = hash;          
            })
            users.save(function(err,user){
                console.log('User saved: ', user);
            })
        }
    })

    res.send({"message":"Successfully reset!"})
})

app.post('/mastercustomerupdate', masterController.getMasterCustomer)

app.post('/loginandroid', async(req,res)=>{

    console.log(req.body.nameValuePairs)

    let logged = false;

    if(req.body.nameValuePairs.name=="reymesson@gmail.com"&&req.body.nameValuePairs.password=="1234567"){
        logged = true
    }

    res.send(logged)
})

app.get('/wallet', async(req,res)=>{

	var wallet = await Wallet.find({})

	res.send(wallet)

})

app.post('/addwalletandroid', async(req,res)=>{ 

	var wallet = new Wallet(req.body.nameValuePairs); 
	wallet.save(function(err){ 

		if(!err){ 
			console.log('Wallet saved');
		 }
	 })
	 console.log(req.body.nameValuePairs)
	 res.send(req.body)
})

app.post('/removewalletandroid', async(req,res)=>{
	 
	 var wallet = await Wallet.remove({"id":req.body.nameValuePairs.id},function(err,wallet){
	
	 	if(!err){
			 console.log("Wallet removed ");
		}	
	})
 	res.send('removed');
})

app.post('/editwalletandroid', async(req,res)=>{ 

    console.log(req.body.nameValuePairs); 
    var wallet = await Wallet.findOne({"id":req.body.nameValuePairs.id},function(err,wallet){ 

        if(!err){ 
            wallet.name = req.body.nameValuePairs.name; 
            wallet.amount = req.body.nameValuePairs.amount; 
            wallet.save(function(err,d){ 
                console.log('Wallet updated');
                })
            } 
    }) 
}) 

mongoose.connect('mongodb://localhost:27017/supreme',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8083);
