const mongoose = require("mongoose");
// var url = 'mongodb://inam:inamkhan123@ds161322.mlab.com:61322/olx';
// var url = 'mongodb://localhost:27017/ecom';
var url ='mongodb+srv://varun:varun123@cluster0.7m0sm.mongodb.net/ecom?retryWrites=true&w=majority';



mongoose.connect(url,{useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR :'));
db.once('open', function () {
  
  console.log('CONNECTION OPENED!!')
  return db;
});