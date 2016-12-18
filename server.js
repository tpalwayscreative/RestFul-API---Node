/**
 * Created by phong on 12/18/16.
 */


var users = require('./app/v1/Users_DBHandler');

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http'),
    app = new express(),
    expressValidator = require('express-validator'),
    port = process.env.PORT || 5000,
    server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(expressValidator());
app.use(morgan('dev'));

app.get('/',function(req,res){

    res.json('Welcome to Restful Node');

});


var apiUsers = express.Router();
users(apiUsers);
app.use('/users',apiUsers);


server.listen(port,function () {

    console.log('Server listening at port %d', server.address().port);

});







