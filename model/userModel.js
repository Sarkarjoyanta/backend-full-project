const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avator:{
        type: String
    }
    ,
    emailVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: "member",
        enum:["admin","member","merchant"]
    },
    created:{
        type: Date,
        default: Date.now()
    },
    updated:{
        type: Date,
    },
    facebookId:{
        type: String ,
    },
    linkedInId:{
        type: String ,
    },
    randomOtp:{
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)