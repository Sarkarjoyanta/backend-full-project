const eamilVelidation = require("../helpers/emailVelidation.js");
const emailVerification = require("../helpers/emailVerification.js");
const otpTemplate = require("../helpers/otpTemplate.js");
const passwordVelidation = require("../helpers/passwordVelidation.js");
const User = require("../model/userModel.js");
const bcrypt = require('bcrypt');
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

async function registrationController(req, res){

    const {fullname,email,password,facebookId,linkedInId} = req.body

    if(!fullname){
        return res.send({error:"Fullname is Required"})
    }else if(!email){
        return res.send({error:"Invalid Email"})
    }else if(!eamilVelidation(email)){
        return res.send({error:"Invalid Email"})
    }else if(!password){
        return res.send({error:"Password is Required"})
    }else if(!passwordVelidation(password)){
        return res.send({error:"Strong password is Required"})
    }else{
        const duplicateEmailCheck = await User.find({email})
        if(duplicateEmailCheck.length > 0){
            return res.send({error:"Email already use"})
        }
    }

    bcrypt.hash(password, 10, async function(err, hash) {
        const user = new User({
            fullname,
            email,
            password: hash,
            facebookId,
            linkedInId,
        })
        user.save()
        const generator2 = aleaRNGFactory(Date.now());
        const randomNamber = generator2.uInt32().toString().substring(0,4)
        
        const randomOtpNumber = await User.findOneAndUpdate(
            {email},
            {$set:{randomOtp: randomNamber}},
            {new:true}
        )
            
        emailVerification(email, randomNamber, otpTemplate)

        setTimeout( async()=>{
            console.log("Otp Delete")
            const randomOtpNumber = await User.findOneAndUpdate(
                {email},
                {$unset:{randomOtp:""}},
                {new: true}
            )
        },60000)

        res.send({
            success : 'Registration Successfull',
            fullname: user.fullname,
            email: user.email
        })

    });

    
}

module.exports = registrationController;