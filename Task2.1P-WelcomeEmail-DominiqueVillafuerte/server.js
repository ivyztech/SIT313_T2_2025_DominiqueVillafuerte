const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const apiKey = '98a3a2444d9ebd4e220c89f312b1a5af-0f1db83d-6caa72db'; 
const domain = 'sandbox10119a93c19f49609d34e69976c74580.mailgun.org'; 
const mg = mailgun({ apiKey: apiKey, domain: domain });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'NIKKI VILLAFUERTE <domsvillafuerte09@gmail.com>',
        to: email,
        subject: 'DEAKIN UNIVERSITY',
        text: 'Welcome to Deakin University'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', body);
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running at port 3000.");
});
