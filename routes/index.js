const ContactosController = require("../controller/ContactosController");
const contactosController = new ContactosController();

const indexController = require("../controller/indexController");

var express = require('express');
var router = express.Router();



/* GET home page. */
router.get("/", indexController);

router.post("/form-contact", contactosController.add);

module.exports = router;

const {Router} = require ('express');
const nodemailer = require ('nodemailer')
const {google} = require ('googleapis')

router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <p>${message}</p>
        </ul>
        <p>${message}</p>
    `;
const CLIENTD_ID="1015802914402-tbpq7n4dhjgcchj3oi5e7u1q6uqc4e8s.apps.googleusercontent.com";
const CLIENT_SECRET="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";
const REDIRECT_URI="https://developers.google.com/oauthplayground";
const REFRESH_TOKEN="1//04l0PQ8ADB_lPCgYIARAAGAQSNwF-L9IrzhEsaySGz6prRr_9It-KTAcSQMDHjXDfsRWxd-1xS7ObDOXHzvDJWcr7J-AHcTKqhj8";

const oAuth2Client = new goolge.auth.OAuth2(
    CLIENTD_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
 async function sendMail(){
     try{
         const accessToken=await oAuth2Client.getAccessToken()
       const transporter = nodemailer.createTransport({
                 service:"gmail",
                 auth:{
                     type:"OAuth2",
                     user:"carlosascaniogamezz@gmail.com",
                     clientId:CLIENTD_ID,
                     clientSecret:CLIENT_SECRET,
                     clientToken:REFRESH_TOKEN,
                     accessToken: accessToken
                 },

             });

             const mailOptios = {
                     from: "Pagina web Nodemailer <carlosascaniogamezz@gmail.com>",
                     to: "carlosascaniogamezz@gmail.com",
                     subject:"Nodemailer prueba",
                     html:contentHTML,

            };

 const result= await transporter.sendMail(mailOptions);
 return result;
        }catch(err) {
     console.log(err);

 }
  }
  sendMail()
   .then(result=> res.status(200).send ('enviado'))
   .catch((error)=> console.log(error.message));

 });
 
 module.exports= router;

 