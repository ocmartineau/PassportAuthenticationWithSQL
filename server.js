const express = require('express');
const passport   = require('passport');
const session    = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const app = express();



app.get('/', function(req, res) {

    res.send('Welcome to Passport Authentication with Sequelize');

});


app.listen(5000, function(err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});

// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions