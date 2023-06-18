const bcrypt = require('bcrypt');
const User = require("../model/userModel.js")
const eamilVelidation = require("../helpers/emailVelidation.js")
const passwordVelidation = require("../helpers/passwordVelidation.js")

async function loginController(req, res){
    const {email, password} = req.body

    if(!email){
        return res.send({error:"Invalid Email"})
    }else if(!eamilVelidation(email)){
        return res.send({error:"Invalid Email"})
    }else if(!password){
        return res.send({error:"Password is Required"})
    }else if(!passwordVelidation(password)){
        return res.send({error:"Strong password is Required"})
    }else{
        const isEmailCheck = await User.find({email})
        if(isEmailCheck.length > 0){
            bcrypt.compare(password, isEmailCheck[0].password).then(function(result) {
                if(result){
                    res.send({
                        success: "Login Successfully",
                    })
                }else{
                    return res.send({error:"Password don't match"})
                }
            });
        }else{
            return res.send({error:"Email don't Match"})
        }
    }

}

module.exports = loginController;