const nodemailer = require("nodemailer");

async function emailVerification(email, varify, template){

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: "grzdjecxtnywioxb",
        },
      });
    
      let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email, 
        subject: "Please Varify Your Mail",
        html: template(varify),
      });

}

module.exports = emailVerification;