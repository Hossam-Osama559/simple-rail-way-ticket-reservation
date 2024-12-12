
const axios=require('axios')
const mysql=require('mysql2')
const qrcode=require('qrcode')
const path = require('path'); 
const express = require('express');
const { json } = require('body-parser');

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port=3000
var pa=path.join(__dirname,'new.png') 
app.use(express.static(path.join(__dirname)))
const db=connet()
 db.connect((err)=>{
    if (err){
    console.log(err)}
    })
//tickit info
app.post('/info',(req,res)=>{
   
    const { fromStation, arrivalStation, passengerId, passengerName, journeyDate } = req.body;
    console.log('Reservation Data:', {
        fromStation,
        arrivalStation,
        passengerId,
        passengerName,
        journeyDate
    });
    
    generate_qr(passengerId,pa).then(()=>{res.status(200).end()})
    const query='insert into tickit (id,date_t) values(?,?)'

    const db=connet()

  
    
    db.query(query,[passengerId,journeyDate],(err,reseult)=>{
    if (err){
    console.log(err)
    }
    }
    )
    
   
})

// employee form

app.post('/emp',(req,res)=>{
       
      const {id,name}=req.body
      const query=`select * from employee where id=?`
      console.log(id,name)
      db.query(query,[id],(err,result)=>{
        if (err){
            console.log(err)
        }
        else {
            if (result.length){
                console.log(result)
                const pa=path.join(__dirname,'welcome.html')
                res.sendFile(pa)
            }
            else {

                console.log("spay")
                res.status(404).end()
            }
        }
      })
})

// validate employee

app.get('/validate',(req,res)=>{
    const path_to=path.join(__dirname,'employee.html')
    res.sendFile(path_to)
})
// send the qrcode

app.get('/down',(req,res)=>{
    
     
    //
    res.download(pa)
})

// go to scanner 

app.get('/scanner',(req,res)=>{
    console.log("hello")
    const to=path.join(__dirname,'welcome.html')
    res.sendFile(to)
})


app.get('/wel',(req,res)=>{
    const htmlFilePath = path.join(__dirname, 'info.html');
    res.sendFile(htmlFilePath)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });


  function generate_qr(id,path){
    return new Promise((x,y)=>{
          qrcode.toFile(path,id,(err)=>{
        if (err){
            y(err)
        }
        else {
            console.log("done")
            x()
        }
        
    })
    })
  
  }

  // create db connection

  function connet(){
const db = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: 'your_password',
  database: 'rail_way'    
  })
  return db
  }


  app.post('/validate_user',(req,res)=>{
    let {id}=req.body
    let date=getCurrentDate()
    let query=`select * from tickit where id=? and date_t=?`
    
    db.query(query,[id,date],(err,result)=>{
        if (err){
            console.log(err)
        }
        else {
            //console.log(result)

            if (result.length){
                res.status(200).end()
            }
            else {
                res.status(404).end()
            }

        }
    })

  })

const getCurrentDate = () => {
    const today = new Date();
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  

  