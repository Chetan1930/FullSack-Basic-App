const express=require('express');
const app=express();
const cors=require('cors');
const connection=require('./db/connection');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authRoute= require('./routes/authRoute');
const indexx=require('./routes/index')
const {authManage} = require('./middlewares/authmanage')
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true
}));
app.get('/',indexx);
app.get("/api/user/me", authManage, (req, res) => {
  res.json({ user: req.user });
});
app.use('/api/auth',authRoute);



app.listen(3000,()=>console.log("Sever is running at Port 3000"));