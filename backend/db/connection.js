const { config, configDotenv } = require('dotenv');
const mongoose=require('mongoose');
require('dotenv').config();


const connection = async()=>{
    try {
       const success=  await mongoose.connect(process.env.MONGO_URI)
       console.log("Connection Established successfully");
        
    } catch (error) {
        console.error("dikka ho gyi",error.message);
    }

} 

module.exports = connection;