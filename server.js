const express = require('express');
const passport   = require('passport');
const session    = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
// const env = require('dotenv').load();

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res) {

    res.send('Welcome to Passport Authentication with Sequelize');

});


app.listen(5000, function(err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});

//Models
const models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Database is connected!')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Routes
const authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);