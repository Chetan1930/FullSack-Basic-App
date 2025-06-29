const express=require('express');
const app=express();
const connection=require('./db/connection');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authRoute= require('./routes/authRoute');
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth',authRoute);



app.listen(3000,()=>console.log("Sever is running at Port 3000"));