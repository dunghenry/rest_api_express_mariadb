const pool = require('../config/connectDB');
const {getUsers} = require('../queries/user');
const bcrypt = require('bcrypt');
const userController = {
    getUsers: async(req, res) =>{
       try {
            const users = await pool.query(getUsers);
            
            return res.status(200).json(users);
       } catch (error) {
            console.log(error);
       }
    }
}

module.exports = userController;