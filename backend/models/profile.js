const mongoose=require('mongoose');

const profileSchema= new mongoose.Schema({
    jobProfile:{
        type:String,
        required:true,
        trim:true
    },
    skills:{
        type:Array,
    }
},{timestamps:true})

module.exports = mongoose.model('Profile',profileSchema);