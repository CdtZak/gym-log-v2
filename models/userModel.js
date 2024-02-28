
const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name']
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Email is not valid']
    },
    password:{
        type:String,
        required:[true,'Please provide a password !']
    },
    exercices:[{
        exname: {
            type: String,
            required: [true, 'Please provide an exercise name'],
        },
        weight: {
            type: Number,
            required: [true, 'Please provide the weight for the exercise'],
        },
        date: {
            type: String,
            
        },
    }]
        
    
})
const User = mongoose.model('User',userSchema)
module.exports = User

