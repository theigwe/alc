let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);
let request = require('request');

//mongodb connection
let MongoClient = require('mongodb').MongoClient;

module.exports = (app) => {

    app.get('/view/:regno', (req,res)=>{
        var regno = req.params['regno'];
        request.get(`${constants.domain}/api/student/view/${regno}`,(error,response,body)=>{
            if (!error) {
                if (JSON.parse(body).status === 200) {
                    res.render('view', {title: `Student Profile | ${regno}`, data : JSON.parse(body).data});
                }else {
                    res.render('view-error', {title: `Error | ${regno} not found`, reg_number : regno})
                }

            }else {
                res.render('view-error', {title: `Error | ${regno} not found`, reg_number  : regno})
            }
        });
    });
};
