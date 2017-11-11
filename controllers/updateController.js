let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);
let request = require('request');

//mongodb connection
let MongoClient = require('mongodb').MongoClient;

//parse incoming request bodies using body-parser middleware
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false }); // create application/x-www-form-urlencoded parser

module.exports = (app) => {

    app.get('/update/:regno', (req,res)=>{
        var regno = req.params['regno'];
        request.get(`${constants.domain}/api/student/view/${regno}`,(error,response,body)=>{
            if (!error) {
                if (JSON.parse(body).status === 200) {
                    res.render('update', {title: `Update Profile | ${regno}`, data : JSON.parse(body).data});
                }else {
                    res.render('update-error', {title: `Update error | ${regno} not found`, reg_number : regno})
                }

            }else {
                res.render('update-error', {title: `Update error | ${regno} not found`, reg_number  : regno})
            }
        });
    });

    app.get('/update-success/:regno', (req,res) => {
        var regno = req.params['regno'];
        request.get(`${constants.domain}/api/student/view/${regno}`,(error,response,body)=>{

            if (!error) {
                if (JSON.parse(body).status === 200) {
                    res.render('update-success', {title: `Update Completed Successfully | ${regno}`, data :  JSON.parse(body).data } );
                }else {
                    res.render('update-success', {title: `Update Completed Successfully | ${regno}`, data : null, reg_number : regno })
                }
            }else {

                res.render('update-success', {title: `Update Completed Successfully | ${regno}`, data : null, reg_number : regno })
            }
        });

    });

    app.post('/update',urlencodedParser,(req,res)=>{
        if (!req.body) {
            res.send({status: 401, data : 'Error processing request '});
        }else {
            request.post(`${constants.domain}/api/student/update`,(error,response,body)=>{
                if(!error && response.statusCode === 200){
                    res.send(body);
                }else {
                    res.send({status : 500, data: response});
                }
            }).form(req.body);
        }
    });
};
