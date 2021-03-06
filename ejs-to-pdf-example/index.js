var ejs = require('./utils/ejs');
var pdf = require('./utils/pdf');
var moment = require('moment');
var mongoose = require('mongoose');
var data = require('./data/data.json');
var express = require('express'),
fs = require('fs'),
app = express();
var Master = require('./models/master.js');

var values = ""

app.get('/:id', async (req, res) =>{

    var fileName = moment().format('YYYYMMDDHHmmSS')+'.pdf'

    if(values==""){

        values = req.params.id
    }

    var data = await Master.find({"id":values})

    console.log(data)

    ejs.toHTML('./templates/index.ejs', data[0]).then(function (html) {
        var options = { format: 'Letter' };
        // var output = './data/out/pdf_' + moment().format('YYYYMMDDHHmmSS') + '.pdf'
        var output = './data/out/pdf_' + fileName
    
        pdf.toPDF(html, options, output).then(function (response) {
            console.log("PDF file successfully written");
            console.log(response);
        }, function (error) {
            console.error(error);
        });
    }, function (error) {
       console.error(error);
    });
    

    setTimeout(() => {
    
         //var filePath = "/data/out/pdf_20190514193342.pdf";
        var filePath = "/data/out/pdf_"+fileName;
        
        fs.readFile(__dirname + filePath , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });

    }, 5000);

values="";    


});


mongoose.connect('mongodb://localhost:27017/supreme',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(3000, function(){
console.log('Listening on 3000');
});
