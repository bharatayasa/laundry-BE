const mysql = require('mysql');
require('dotenv').config();

function createConnection() {
    const connection = mysql.createConnection({
        host    : process.env.DB_HOST,
        user    : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    function handleDisconnect() {
        connection.connect((err) => {
            if (err) {
                console.error('Failed connecting to MySQL database:', error.message);
                setTimeout(handleDisconnect, 2000);
            } else {
                console.log('Connected to MySQL database');
            }
        });

        connection.on('error', (err) => {
            console.error('Database connection error:', err);
            if (err.code === 'ECONNRESET') {
                console.log('try to connecting...');
                handleDisconnect();
            } else {
                throw err;
            }
        });
    }

    handleDisconnect();

    return connection;
}

module.exports = createConnection();