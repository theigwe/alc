let appRoot     = require('app-root-path');
let constants   = require(`${appRoot}/local_modules/constants`);
let functions   = require(`${appRoot}/local_modules/localFunctions`);

//validate & sanitize form data
const validator = require('validator');

//parse incoming request bodies using body-parser middleware
const bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//mongodb connection
const MongoClient = require('mongodb').MongoClient;

module.exports = (app) => {
    app.get('/api', (req,res) => {
        res.render('api',{title: 'ALC 2.0 Assessment API'});
    });

    app.post('/api/student/add',urlencodedParser,(req,res) => {
        if (!req.body) {res.send({status: 400});}
        else {
            var newData = {};

            //sanitize post data
            for (x in req.body) {
                var escaped = validator.escape(req.body[x]);
                newData[x] = validator.trim(escaped);
            }
            //get input input errors
            var validatePostData = functions.inputValidator(newData);

            MongoClient.connect(constants.dburl, (err, db) => {
                if (!err) {

                    //uncomment next line to create db collection if it does not exist
                    // db.createCollection(constants.stCol);

                    var dbcol = db.collection(constants.stCol);

                    //verify if reg_number is unique
                    dbcol.find({reg_number : newData.reg_number}).toArray(function(err, doc) {
                        if (!err) {
                            if (doc.length > 0) {
                                res.send({status : 400, data : "Reg. number is already registered"})
                            }else {
                                //verify user inputs
                                if(Object.keys(validatePostData).length < 1){
                                    // Insert a single document
                                    dbcol.insertOne(newData, (err, r) => {
                                        if (!err) {
                                            r.insertedCount === 1 ? res.send({status : 200, data : r.ops[0]}) : res.send({status : 500, data : err.message});
                                        }else {
                                            res.send({status : 500, data : err.message});
                                        }
                                        db.close();
                                    });
                                }else {
                                    res.send({status: 400, data: validatePostData});;
                                }
                            }

                        }else {
                            res.send({status : 500, data : err.message});
                        }
                    });
                }else {
                    res.send({status : 500, data : err.message});
                }
            });
        }
    });

    app.get('/api/student/list', (req,res) => {
        MongoClient.connect(constants.dburl, (err, db) => {
            if(!err){
                var dbcol = db.collection(constants.stCol);
                dbcol.find({},{_id  : 0}).toArray(function(err, docs) {
                    if(!err){
                        res.send({status : 200, data : {number : docs.length, students : docs}});
                    }else {
                        res.send({status: 500, data : err.message});
                    }
                    db.close();
                });
            }else {
                res.send({status: 500, data : err.message});
            }
        });
    });

    app.get('/api/student/view/:regno', (req,res) => {
        var regno = req.params['regno'];
        MongoClient.connect(constants.dburl, (err, db) => {
            if(!err){
                var dbcol = db.collection(constants.stCol);
                dbcol.find({reg_number: regno},{_id  : 0}).toArray(function(err, doc) {
                    if(!err){
                        if (doc.length > 0) {
                            res.send({status : 200, data : doc[0]});
                        } else {
                            res.send({status: 400, data : 'No record found!'});
                        }
                    }else {
                        res.send({status: 500, data : err.message});
                    }
                    db.close();
                });
            }else {
                res.send({status: 500, data : err.message});
            }
        });
    });

    app.get('/api/student/delete/:regno', (req, res) => {
        var regno = req.params['regno'];
        MongoClient.connect(constants.dburl, (err, db) => {
            if (!err) {
                var dbcol = db.collection(constants.stCol);
                dbcol.find({reg_number : regno}).toArray(function(err, docs) {
                    if (!err) {

                        if (docs.length !== 0) {
                            dbcol.deleteOne({reg_number : regno},(err,r)=> {
                                if(!err){
                                    db.close();
                                    res.send({status: 200, data : ''});
                                }else {
                                    db.close();
                                    res.send({status : 500, data : err.message});
                                }
                            });
                        }else {
                            db.close();
                            res.send({status: 400, data: 'Reference error: No record found.'});
                        }
                    }else {
                        db.close();
                        res.send({status: 500, data: err.message});
                    }
                });

            } else {
                res.send({status: 500, data: err.message});
            }
        });
    });

    app.post('/api/student/update', urlencodedParser, (req,res) => {
        var newData = {};
        for(x in req.body){
            var escaped = validator.escape(req.body[x]);
            newData[x]   = validator.trim(escaped);
        }

        var validatePostData = functions.inputValidator(newData , 'update');
        MongoClient.connect(constants.dburl, (err, db) => {
            if (!err) {
                var dbcol = db.collection(constants.stCol);

                //verify if reg_number exists
                dbcol.find({reg_number : newData.reg_number}).toArray(function(err, doc) {
                    if (!err) {
                        if (doc.length > 0) {
                            //verify user inputs
                            if(Object.keys(validatePostData).length < 1){
                                // Update existing record
                                dbcol.updateOne({reg_number : newData.reg_number}, {$set : newData}, (err, r) => {
                                    if (!err) {
                                        r.result.n === 1 ? res.send({status : 200, data : newData}) : res.send({status : 500, data : err.message});
                                    }else {
                                        res.send({status : 500, data : err.message});
                                    }
                                    db.close();
                                });
                            }else {
                                res.send({status: 400, data: validatePostData});;
                            }
                        }else {
                            res.send({status : 400, data : `No record found  for the reg. number ${newData.reg_number}.`});
                        }

                    }else {
                        res.send({status : 500, data : err.message});
                    }
                });
            }else {
                res.send({status : 500, data : err.message});
            }
        });
    });
}
