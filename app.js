
let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);

const path          = require('path');
const express       = require('express');
const favicon       = require('serve-favicon');
const bodyParser    = require('body-parser');
const assert        = require('assert');
const request       = require('request');

//mongodb connection
const MongoClient   = require('mongodb').MongoClient;

//load controllers
const api   = require(`${appRoot}/controllers/apiController.js`);
const add   = require(`${appRoot}/controllers/addController.js`);
const del   = require(`${appRoot}/controllers/deleteController.js`);
const svw   = require(`${appRoot}/controllers/viewController.js`);
const upt   = require(`${appRoot}/controllers/updateController.js`);
const lst = require(`${appRoot}/controllers/listController.js`);

const app        = express();

// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", constants.viewEngine);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    request.get(`${constants.domain}/api/student/list`,(error,response,body)=>{
        if (!error && response.statusCode === 200) {
            res.render('index',{title: 'Home | ALC 2.0 Assessment',data : JSON.parse(body).data});
        }else {
            res.render('index',{title: 'Home | ALC 2.0 Assessment',data : null});
        }
    });

});



//initialize controllers
api(app);
add(app);
del(app);
svw(app);
upt(app);
lst(app);


//listen for incoming request to port
app.listen(constants.port, () => {
    console.log(`Successfully connected and running on port ${constants.port}`);
});
