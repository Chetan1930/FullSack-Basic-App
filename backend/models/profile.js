const mongoose=require('mongoose');
const { applyTimestamps } = require('./user');

const profileSchema= new mongoose.Schema({
    
},{timestamps:true})