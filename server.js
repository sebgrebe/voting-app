require('dotenv').config()
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var passport = require('passport')
var flash = require('connect-flash')
var cors = require('cors')
var path = require('path')
var request = require('request')

var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var session = require('express-session')

var ConfigDB = require('./config/db.js')

//configure databse and passport
mongoose.connect(ConfigDB.url)
require('./config/passport')(passport)

//set up express app
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash())

//Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

//configuring server to handle real URLs. See https://github.com/ReactTraining/react-router/blob/v3/docs/guides/Histories.md#browserhistory
app.get('/polls/*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
})
// required for passport
app.use(session({
	secret: 'mySecretKey',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session({
	secret: 'mySecret Key',
	resave: true,
    // name: cookie_name,
    // store: sessionStore, // connect-mongo session store
    proxy: true,
    saveUninitialized: true
}))


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(cors({credentials: true, origin: true}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//-----routes------
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});