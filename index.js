const express = require('express');
const app = express();
const fs = require('fs');
const port =5000;  
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
app.set('view engine','ejs')
 app.use(bodyParser.urlencoded({    
  extended: true
}));
app.use(express.json());
 app.use(bodyParser.json());
mongoose.connect('mongodb+srv://eliasy:qwerty123@cluster0.qlnev.mongodb.net/myhomework?authSource=admin&replicaSet=atlas-rgbxg5-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', 
               {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    //console.log(con.connections);
    console.log('DB  success')
  });


http.createServer(function(req, res){
    fs.readFile('frontend.ejs',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
  });
 app.get("/myhomework", function (req, res){
     //show this file when the "/" is requested
     res.sendFile(`${__dirname}/frontend.ejs`);
 });

console.log('helo');
/*app.post('/myhomework',function(req, res,next){
    ;
const myfirstName = req.body.firstname;
const mylastName = req.body.lastname;
const myCompany = req.body.company;
const myEmail = req.body.email;
const myPhoneNumber =req.body.phonenumber;

    res.send(myfirstName+' '+mylastName+' '+myCompany+' '+myEmail);
  console.log(`firtsname : ${myfirstName}`);
  console.log(`lastname : ${mylastName}`);
  console.log(`email : ${myEmail}`);
  console.log(`company : ${myCompany}`)
  console.log(`phonenumber : ${myPhoneNumber}`);
    //...
});*/




const signUpSchema = new mongoose.Schema({
  firstname : {
    type :String,
    required : [true,'a account must a have a name'],  
  },
  lastname :{
    type: String,
    required : [true,'a account must have a lastname']
  },
  company :{
    type :String,
    required : [true,'a acount must a  company']
  },
  email:{
    type :String,

  },
  phonenumber :{
    type:Number
  }
});
 const SignUp = mongoose.model('SignUp',signUpSchema); 
  app.post('/myhomework',async (req,res)=>{
  const myinfo = new SignUp(req.body);
  await myinfo.save().then(item=>{
    console.log('done')
    res.status(201).json({
      status:'success',
//   requestedAt : req.requestTime,
   results :myinfo.length,
   data:{ 
      myinfo :myinfo
   }
    })
  }).catch(err=>{
    res.status(400).send("unable to save to database")})

});
app.get('/myhome',async (req ,res)=>{/// tjib data mnel database men wara l server
  const sign =await SignUp.find();
  
 res.status(200).json({
  status :'success',
  results:sign.lenght,//array with mult obj
  data :{
    sign : sign//9.26
    }
   })
});
app.listen( port,()=>{
  console.log (`app running${port}..`);
});
