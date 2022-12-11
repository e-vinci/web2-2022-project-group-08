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
        text: `Vous avez été inscrit au site IPLearn par un administrateur veuillez utilisez votre adresse mail pour vous connecter et votre mot de passe est le suivant : ${password}
        Veillez à bien conserver ce mot de passe. Si vous ne pensez pas être concerné par ce mail, veuillez envoyer un mail à quizzteam8@gmail.com.
        
        L'équipe IPLearn.`
    }

    await transporter.sendMail(mailOptions, (err,info) => {
        if(err){
            console.log(err)
        }else{
            console.log(`email sent: ${info.response}`)
        }
    
    })
}