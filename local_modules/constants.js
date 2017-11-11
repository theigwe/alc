let port = 8080;
module.exports = {
    port        : port,
    domain      : `http://localhost:${port}`,
    stCol       : 'Students', //MongoDB Collection for Students Record
    dburl       : 'mongodb://localhost:27017/alc-assessment',
    viewEngine  : 'ejs',

}
