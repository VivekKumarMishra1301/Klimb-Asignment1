const http = require('http');
const fs=require('fs');
const express = require('express');
const app = express();
const multer=require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(express.static('uploads'));
const async=require('async');
const XLSX = require('xlsx');
const path = require('path');

const db=require('./model/db');
const excelModel=require('./model/candidate');


app.get('/', function(req, res){
    res.sendFile(__dirname + '/home.html');
});
app.get('/script.js', function(req, res){
    res.sendFile(__dirname + '/script.js');
});



db.init().then(function(){
    console.log("db connected");
    app.listen(3000, function () {
        console.log("server is on at port 3000");
    });
}).catch(function(err){
    console.log(err);
});



app.post('/upload',upload.single('xl'),function (req, res){
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
    const newFileName=req.file.filename;
    console.log(newFileName);
      const fl='./uploads/'+newFileName;
    
const filePath = path.join(__dirname, fl);
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const excelData = XLSX.utils.sheet_to_json(worksheet);

async.eachSeries(excelData, (item, callback) => {
   
    console.log("Item Processed")
    const keys=['name','email','mobile','dob','work_exp','resume_Title','current_Location','postal_Address','current_Employer','current_Designation'] ;
    const data={};
    let i=0;
    for(k in item){
        data[keys[i]]=item[k];
        i++;
    }
   
    console.log(item.Email)
    checkExists(item.Email).then(function(exist){
        if(exist) {
            console.log("hello")
            callback();
        }else{
            excelModel.create(data).then(function(data){
                callback();
            }).catch(function(err){
                res.status(500).send("error");
            });
        }
    }).catch(function(err){
        res.status(500).send("error");
    });


  }, (err) => {
    if (err) {
      console.error('An error occurred:', err);
      res.status(500).send("error");
      return;
    } else {
        const path=fl;
        fs.unlink(path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully!');
              res.status(200).send(true);
            }
          });
      console.log('All items processed');
      
    }
  });


})

async function checkExists(data) {
    const document = await excelModel.findOne({email: data});
    console.log(document);
    return !!document; 
  }





