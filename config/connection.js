// Require the MySQL Module
const mysql = require('mysql');
let connection;

// Establish Connection Parameters (if the server contains the JawsDB URL it connects to the JawsDB database
// otherwise it falls back on the local MySQL connection.
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'sushi_db'
    });
}

// Make Connection to MySQL Database
connection.connect(function (err) {
    if (err) {
        console.error(`Error Connecting: ${err.stack}`);
        return
    }
    console.log(`Connected as ID ${connection.threadId}`)
});

// Export Connection for our ORM to use (orm.js)
module.exports = connection;