const user = require('./user');
const auth = require('./auth');
function route(app){
    app.use('/api/user', user);
    app.use('/api/auth', auth);
}
module.exports = route;