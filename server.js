//Initialize express
const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(passport.initialize());
require('./passport')(passport);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./mongodb');

const UserRoute = require('./route');
app.use('/',UserRoute);

const UserLogin = require('./loginRoute');
app.use('/',UserLogin);

const AdUserPost =require('./Routes/AdsRoute');
app.use('/',AdUserPost)

app.use(express.static('.'));
 
const port = process.env.PORT || 3001;
  
app.listen(port, () => {
console.log('Example app listening on port !',port);
});