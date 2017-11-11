let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);
let request = require('request');
let express = require('express');

//mongodb connection
let MongoClient = require('mongodb').MongoClient;

//parse incoming request bodies using body-parser middleware
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false }); // create application/x-www-form-urlencoded parser

module.exports = (app) => {

    app.get('/add', (req,res)=>{
        res.render('add', {title: 'ALC 2.0 Assessment | Add Student'});
    });

    app.get('/add-success/:reg', (req,res) => {
        var reg_number = req.params['reg'];
        MongoClient.connect(constants.dburl, (err, db) => {
            var dbcol = db.collection('Students');
            dbcol.find({reg_number : reg_number}).toArray(function(err, docs) {
                res.render('add-success', {title: `Record Added Successfully | ${docs[0].reg_number}`, name : `${docs[0].first_name} ${docs[0].last_name}`, reg_number : docs[0].reg_number});
                db.close();
            });
        });
    });

    app.post('/add',urlencodedParser,(req,res)=>{
        if (!req.body) {res.send({status: 400});}
        else {
            request.post(`${constants.domain}/api/student/add`,(error,response,body)=>{
                if(!error && response.statusCode === 200){
                    res.send(body);
                }else {
                    res.send({status : 500, data: response});
                }
            }).form(req.body);
        }
    });
};
