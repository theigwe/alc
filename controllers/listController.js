let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);
let request = require('request');

//mongodb connection
let MongoClient = require('mongodb').MongoClient;

module.exports = (app) => {
    app.get('/list',(req,res)=>{
        request.get(`${constants.domain}/api/student/list`,(error,response,body)=>{
            if (!error) {
                if (JSON.parse(body).status === 200) {
                    res.render('list',{title: 'List of Students | ALC 2.0 Assessment ', students : JSON.parse(body).data.students });
                }else {
                    res.send(error.message);
                }

            }else {
                res.send(error.message)
            }
        });
    });
};
