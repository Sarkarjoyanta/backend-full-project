const User = require("../model/userModel.js");

async function otpmatchController(req, res){
    const {email, randomOtp} = req.body 

    const otpMatch = await User.find({email})

    if(otpMatch.length > 0){
        if(randomOtp == otpMatch[0].randomOtp){
            res.send({error: "Otp Match"})
            const removeOtp = await User.findOneAndUpdate(
                {email},
                {$unset: {randomOtp: ""}},
                {new: true}
            )
        }else{
            res.send({error: "Otp don't Match"})
        }
    }
    
}

module.exports = otpmatchController;