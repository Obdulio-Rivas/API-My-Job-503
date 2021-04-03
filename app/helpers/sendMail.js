const nodemailer = require('nodemailer');

//Constantes del email.
const imgLogo = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Flogo.com%2F&psig=AOvVaw1x5d25-q95ZqQOOJMhVce-&ust=1617495575074000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCaiuHm4O8CFQAAAAAdAAAAABAV'

const sendConfirmationEmail = (name, email, confirmationCode) => {
    //Creamos el objeto transport.
    const transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    //Mandamos el mail.
    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirmacion de cuenta My Job 503!",
        html: `
                <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                    <tr>
                        <td style="background-color: #ecf0f1; text-align: left; padding: 0">
                            <img width="20%;" style="display:block; margin: 1.5% 3%;" src="${imgLogo}" alt="Logo My Job 503">
                        </td>
                    </tr>    
                    <tr>
                        <td style="background-color: #ecf0f1">
                            <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">                    
                                <h1>Bienvenido a bordo ${name}!</h1>
                                <h2>Hola 👋 ${name}, nos llena de orgullo 🙌 que te hayas registrado.</h2>
                                
                                <p style="margin: 2px; font-size: 15px">Ahora bien no esperemos más 🏃 y por favor confirma tu correo electronico 📧 dando click en el siguiente enlace.</p>
                                <p style="margin: 2px; font-size: 15px">Gracias por confiar en nosotros, no nos cabe duda que podras encontrar tu primer empleo pronto 💪, 
                                contamos con cientos de empresas registradas 🤝 que buscan personas como tu 💼, sera facil ubicarte en una de ellas.</p>
                                
                                <div style="width: 100%; text-align: center; margin: 10px auto;">
                                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="${process.env.URL_CONFIRMATION}${confirmationCode}">Confirmar cuenta</a>	
                                </div>

                                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">My Job 503 - Todos los derechos reservados</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `,
    }).catch(err => console.log(err));
};

module.exports = {
    sendConfirmationEmail
}