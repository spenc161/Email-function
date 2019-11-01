const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.locals.layout = false;

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('contact');
});

//Template
app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul> 
            <li>Name: ${req.body.name}</li>
            <li>Organization: ${req.body.organization}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'imap.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'a649538729@gmail.com', // generated ethereal user
            pass: 'Kk890008100309', // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let mailOptions ={
        from:'"Node"<a649538729@gmail.com>',
        to:'crspencer9123@gmail.com',
        subject:'hi',
        text:'hi',
        html:output
    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL:%s', nodemailer.getTestMessageUrl(info));
    });
    }); 





app.listen(3000, () => console.log('Server started...'));