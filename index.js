var express = require('express')  
var app = express()

app.use(express.static('public'));



const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
 
initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();
  
app.get('/signup', function (req, res) {  
res.sendFile( __dirname + "/public/" + "sign.html" );

  
})  
app.get('/signupSubmit', function (req, res) {  
    db.collection('userDemo').add({
        FullName:req.query.Fullname,
        Email:req.query.Email,
        Password:req.query.Password,
    }).then(()=>{
      res.send("signup sucessfull, please login ")
    });
});
  
app.get("/loginSubmit", function (req,res) {  
 db.collection('userDemo')
   .where("Email","==",req.query.Email)
   .where("Password","==",req.query.Password)
   .get()
   .then((docs)=>{
    if(docs.size>0){
        res.send("successfull")
    }
    else{
        res.send("Fail")
    }
   })
})
app.get("/signin", function (req,res) {  
    res.sendFile( __dirname + "/public/" + "log.html" );
});
app.listen(3000);
