const user = require('./user');
function route(app){
    app.use('/api/user', user);
}
module.exports = route;