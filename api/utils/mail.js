const nodemailer =  require('nodemailer');

module.exports.send = async function(recipient, password){
    const transporter = nodemailer.createTransport({  
        host: 'smtp.gmail.com',
        port: 587, 
        auth: {  
          user: "quizzteam8@gmail.com", 
          pass: "upckbhtuwmyppjvs",

        }  
      });

    const mailOptions = {
        from: "quizzteam8@gmail.com",
        to: recipient,
        subject: "Inscription au Quizz",
        text: `Vous avez été inscrit au site de quizz bla bla bla votre login est votre adresse mail et votre mot de passe est : ${password}`
    }

    await transporter.sendMail(mailOptions, (err,info) => {
        if(err){
            console.log(err)
        }else{
            console.log(`email sent: ${info.response}`)
        }
    
    })
}