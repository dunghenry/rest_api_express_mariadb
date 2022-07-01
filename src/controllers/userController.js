const pool = require('../config/connectDB');
const { getUsers, createUser, checkEmail, getUser, deleteUser, updateUser } = require('../queries/user');
const userController = {
     getUser: async (req, res) => {
          const id = req.params.id;
          try {
               const user = await pool.query(getUser, [id]);
               if (!user[0]?.id) {
                    return res.status(404).json("User not found.");
               }
               return res.status(200).json(user[0]);
          } catch (error) {
               console.log(error);
               return res.status(500).json(error)
          }
     },
     getUsers: async (req, res) => {
          try {
               const users = await pool.query(getUsers);
               return res.status(200).json(users);
          } catch (error) {
               return res.status(500).json(error)
          }
     },
     createUser: async (req, res) => {
          try {
               const { email, password, createAt } = req.body;
               const user = await pool.query(checkEmail, [email]);
               if (user.length) {
                    return res.status(400).json("Email already exists.");
               }
               await pool.query(createUser, [email, password, createAt ?? new Date()]);
               return res.status(201).json("Created user successfully.");
          } catch (error) {
               console.log(error);
               return res.status(500).json(error);
          }
     },
     deleteUser: async (req, res) => {
          const id = req.params.id;
          try {
               const user = await pool.query(getUser, [id]);
               if (!user[0]?.id) {
                    return res.status(404).json("User not found.");
               }
               await pool.query(deleteUser, [id]);
               return res.status(200).json("Deleted user successfully.");

          } catch (error) {
               console.log(error);
               return res.status(500).json(error);
          }
     },
     updateUser: async (req, res) => {
          try {
               const id = req.params.id;
               const {email, password, createAt} = req.body;
               const user = await pool.query(getUser, [id]);
               const data = await pool.query(checkEmail, [email]);
               const arrId = data.filter((item) => item.id !== +id);
               if (!user[0]?.id) {
                    return res.status(404).json("User not found.");
               }
               if (arrId.length){
                    return res.status(400).json("Email already exists.");
               }
               await pool.query(updateUser, [email ?? user[0]?.email, password ?? user[0]?.password, createAt ?? user[0]?.createAt, id]);
               return res.status(200).json("Updated user successfully.");
          } catch (error) {
               console.log(error);
               return res.status(500).json(error);
          }
     }
}

module.exports = userController;