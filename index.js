// require express
const express = require('express');
const port = 7000;
const dotenv = require('dotenv');
dotenv.config();
const app = express();
// const cookieparser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const path = require('path');


// require connect-flash
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

// used for session cookies
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local');

const MongoStore = require('connect-mongo');



// layouts for ejs
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:false}));
// app.use(cookieparser())

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(express.static('./assets')); 
app.use(express.static(__dirname+'/assets'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//mongo store is used to store the session cookie
app.use(session({
    name: 'habitTracker',
    secret: "12345",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:process.env.MONGO_URL,
            autoRemover : 'disabled'
        },
        function(err){
            console.log("Error in the mongo-store");
        }
    ),
}));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash middleware
app.use(flash());
app.use(flashMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));

// directing the app in the given port
app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log(`server is running on http://localhost:${port}`);

});