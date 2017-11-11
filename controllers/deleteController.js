let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);
let request = require('request');

module.exports = (app) => {
    app.get('/delete/:regno', (req,res)=>{
        var regno = req.params['regno'];
        request.get(`${constants.domain}/api/student/delete/${regno}`,(error,response,body)=>{
            if (!error) {
                res.send(body);
            }else {
                res.send({status : 500, data : error.message});
            }
        });
    });
};
