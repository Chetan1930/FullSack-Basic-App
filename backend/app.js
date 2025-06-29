const express=require('express');
const app=express();



app.get('/', function(req,res){
    res.send("Backend is working fine!!")
})



app.listen(3000,()=>console.log("Sever is running at Port 3000"));