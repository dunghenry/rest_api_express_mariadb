const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    connectionLimit: 5
})
pool.on('release', function (connection) {
    console.log('Connection released', connection.threadId)
})
pool.on('acquire', function (connection) {
    console.log('Connection acquired', connection.threadId)
})
process.on('SIGINT', async () => {
    console.log("Killed server");
    await pool.end();
});
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('Database connection was refused');
        }
    }
    if (connection) connection.release();
    console.log(connection)
    console.log("Connected db successfully");
    return;
})

module.exports = pool;