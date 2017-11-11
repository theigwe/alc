let appRoot = require('app-root-path');
let constants = require(`${appRoot}/local_modules/constants`);
let validator     = require('validator');

//mongodb connection
let MongoClient = require('mongodb').MongoClient;



module.exports = {

    inputValidator : (data) => {
        var inputErrors = {};

        //validate supplied reg number
        if (data.hasOwnProperty('reg_number')) {
            if (validator.isEmpty(data.reg_number) || !validator.isLength(data.reg_number,{min:6, max:6})) {
                inputErrors.reg_number  = "Reg. number is not valid";
            }
        }


        //validate other supplied data
        for (x in data) {
            if (validator.equals(x,'first_name') || validator.equals(x,'middle_name') || validator.equals(x,'last_name')) {
                if (validator.isEmpty(data[x]) || !validator.isLength(data[x], {min: 3, max: 20})) {
                    var xParts = x.split("_");
                    inputErrors[x] = xParts[0].charAt(0).toUpperCase() + xParts[0].slice(1) + ' ' + xParts[1] + ' is not valid.';
                }
            }

            if (validator.equals(x,'level') || validator.equals(x,'department')) {
                if (validator.isEmpty(data[x])) { inputErrors[x] = x.charAt(0).toUpperCase() + x.slice(1) + ' is not valid.';}
            }

            if(x == 'age') { if (validator.isEmpty(data[x]) || validator.equals(data[x],0)) { inputErrors.age = "Age is not valid"; } }
        }

        return inputErrors;
    }
}
